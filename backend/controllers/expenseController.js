import Expense from '../models/Expense.js';

/**
 * Get all expenses for a user
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getExpenses = async (req, res, next) => {
  try {
    const { category, month, year, search } = req.query;
    const userId = req.userId;

    // Build filter
    let filter = { userId };

    // Filter by category
    if (category && category !== 'All') {
      filter.category = category;
    }

    // Filter by month and year
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      filter.date = { $gte: startDate, $lte: endDate };
    }

    // Search by title
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    // Fetch expenses
    const expenses = await Expense.find(filter).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single expense
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const expense = await Expense.findOne({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      expense
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new expense
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date, description } = req.body;
    const userId = req.userId;

    const expense = new Expense({
      userId,
      title,
      amount,
      category,
      date: date || new Date(),
      description
    });

    await expense.save();

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      expense
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update expense
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date, description } = req.body;
    const userId = req.userId;

    let expense = await Expense.findOne({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Update fields
    if (title) expense.title = title;
    if (amount !== undefined) {expense.amount = amount;}    if (category) expense.category = category;
    if (date) expense.date = date;
    if (description !== undefined) expense.description = description;
    expense.updatedAt = new Date();

    await expense.save();

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      expense
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete expense
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const expense = await Expense.findOneAndDelete({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get expense statistics
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getStatistics = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { month, year } = req.query;

    let matchStage = { userId };

    // Filter by month and year if provided
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      matchStage.date = { $gte: startDate, $lte: endDate };
    }

    // Aggregate statistics
    const statistics = await Expense.aggregate([
      { $match: matchStage },
      {
        $facet: {
          total: [
            { $group: { _id: null, totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } }
          ],
          byCategory: [
            { $group: { _id: '$category', amount: { $sum: '$amount' }, count: { $sum: 1 } } },
            { $sort: { amount: -1 } }
          ],
          byMonth: [
            {
              $group: {
                _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
                amount: { $sum: '$amount' }
              }
            },
            { $sort: { _id: 1 } }
          ]
        }
      }
    ]);

    res.status(200).json({
      success: true,
      statistics: statistics[0]
    });
  } catch (error) {
    next(error);
  }
};
