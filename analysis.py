import pandas as pd
import matplotlib.pyplot as plt

# Read the CSV file
file_path = r'C:\Users\Krishna\OneDrive\Desktop\ABHILASH\Engineering_stu.csv'
data = pd.read_csv(file_path)

# Extracting year and students columns
years = data['year']
students = data['students']

# Plotting the bar graph
plt.bar(years, students, color='blue')
plt.title('Engineering Students Over Years')
plt.xlabel('Year')
plt.ylabel('Number of Students in million')
plt.grid(True)

# Save the plot as an image
plt.savefig('plot.png')
