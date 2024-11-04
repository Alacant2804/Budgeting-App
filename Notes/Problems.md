# Troubleshoots

1. Couldn't connect database
   Issue: `const db = client.db('your-database-name');` - in this code i had to replace the name of the database.
   Solution: `const db = client.db('BudgetingApp');` - BudgetingApp name of the cluster
