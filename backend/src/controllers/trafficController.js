import jwt from 'jsonwebtoken';
import Traffic from '../models/Traffic.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// ─── Log Page View ─────────────────────────────────────
export const logPageview = async (req, res) => {
  try {
    const { path, referrer } = req.body;
    if (!path) {
      return res.status(400).json({ success: false, message: 'Path is required' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    // Handle optional token decoding for authenticated user tracking
    let userId = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        // Silent catch: invalid/expired token is ignored for guest traffic logging
      }
    }

    const traffic = await Traffic.create({
      path,
      referrer,
      ip,
      userAgent,
      userId,
    });

    res.status(201).json({ success: true, traffic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Traffic & Store Analytics (Admin only) ────────
export const getTrafficStats = async (req, res) => {
  try {
    // 1. Overall Totals
    const totalViews = await Traffic.countDocuments();
    
    // Unique visitors based on distinct IP addresses
    const uniqueVisitorsResult = await Traffic.distinct('ip');
    const totalUniqueVisitors = uniqueVisitorsResult.length;

    const totalOrders = await Order.countDocuments();
    
    const salesResult = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$total" } } }
    ]);
    const totalSales = salesResult.length > 0 ? salesResult[0].totalSales : 0;

    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'customer' });

    // 2. Traffic over the last 7 days (grouped by day)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const trafficOverTime = await Traffic.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          views: { $sum: 1 },
          uniques: { $addToSet: "$ip" }
        }
      },
      { 
        $project: { 
          date: "$_id", 
          views: 1, 
          uniques: { $size: "$uniques" }, 
          _id: 0 
        } 
      },
      { $sort: { date: 1 } }
    ]);

    // 3. Views by Page
    const viewsByPage = await Traffic.aggregate([
      {
        $group: {
          _id: "$path",
          views: { $sum: 1 },
          uniques: { $addToSet: "$ip" }
        }
      },
      {
        $project: {
          path: "$_id",
          views: 1,
          uniques: { $size: "$uniques" },
          _id: 0
        }
      },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]);

    // 4. Recent activity log
    const recentActivity = await Traffic.find()
      .populate('userId', 'name email')
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({
      success: true,
      stats: {
        totalViews,
        totalUniqueVisitors,
        totalOrders,
        totalSales,
        totalProducts,
        totalUsers,
        trafficOverTime,
        viewsByPage,
        recentActivity,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
