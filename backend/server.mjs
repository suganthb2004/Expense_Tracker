// server.mjs
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://madhankumar:7094789652@cluster0.dprncje.mongodb.net/expenses?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
// Define mongoose schema and model for expenses
const expenseSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  amountSpent: Number,
});

const Expense = mongoose.model('Expense', expenseSchema);

// Define mongoose schema and model for profile
const profileSchema = new mongoose.Schema({
  clientName: String,
  email: String,
  income: Number,
  workSpecification: String,
});

const Profile = mongoose.model('Profile', profileSchema);

// Middleware to parse JSON data
app.use(bodyParser.json());

// API endpoint to get profile data
app.get('/api/getProfileData', async (req, res) => {
  try {
    const profileData = await Profile.findOne();
    res.json(profileData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to save profile data
app.post('/api/saveProfile', async (req, res) => {
  const { clientName, email, income, workSpecification } = req.body;

  try {
    await Profile.updateOne({}, { clientName, email, income, workSpecification }, { upsert: true });
    res.send('Profile data saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to get expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to save expense data
app.post('/api/saveExpense', async (req, res) => {
  const { category, amountSpent } = req.body;

  try {
    // Find the existing expense by category
    const existingExpense = await Expense.findOne({ category });

    if (existingExpense) {
      // If the expense exists, update the amountSpent
      existingExpense.amountSpent += amountSpent;
      await existingExpense.save();
      console.log('Expense data updated successfully:', { category, amountSpent: existingExpense.amountSpent });
    } else {
      // If the expense does not exist, create a new one
      const newExpense = new Expense({ category, amountSpent });
      await newExpense.save();
      console.log('New expense data saved successfully:', { category, amountSpent });
    }

    // Fetch and send the updated expense data
    const updatedExpenses = await Expense.find();
    res.json(updatedExpenses);
  } catch (error) {
    console.error('Error saving/updating expense data:', error);
    res.status(500).send('Internal Server Error');
  }
});
// API endpoint to update expense data
app.post('/api/updateExpense', async (req, res) => {
  const { category, amountSpent } = req.body;

  try {
    const existingExpense = await Expense.findOne({ name: category });

    if (existingExpense) {
      // Update the amountSpent
      existingExpense.amountSpent += amountSpent;
      await existingExpense.save();
      console.log('Expense data updated successfully:', { category, amountSpent: existingExpense.amountSpent });
    } else {
      console.log('Expense not found:', category);
    }

    // Fetch and send the updated expense data
    const updatedExpenses = await Expense.find();
    res.json(updatedExpenses);
  } catch (error) {
    console.error('Error updating expense data:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Add a new API endpoint to reset amountSpent for all expenses
app.post('/api/resetExpenses', async (req, res) => {
  try {
    // Reset the amountSpent field to 0 for all expenses in the database
    await Expense.updateMany({}, { $set: { amountSpent: 0 } });
    
    console.log('Amount spent for all expenses reset successfully.');

    // Send a success response
    res.send('Amount spent for all expenses reset successfully');
  } catch (error) {
    console.error('Error resetting amount spent:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});