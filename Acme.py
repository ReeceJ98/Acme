from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

@app.route("/")
def helloWorld():
  return "Hello, cross-origin-world!"




# Define your database connection parameters
server = 'MSI\SQLEXPRESS03'
database = 'Acme'





# Establish a connection to the SQL Server database
conn = pyodbc.connect('DRIVER={SQL Server};SERVER=' + server + ';DATABASE=' + database)
cursor = conn.cursor()





# CREATE operation
@app.route('/create', methods=['POST'])
def create_record():
    try:
        data = request.get_json()
        column1 = data['EmployeeID']
        column2 = data['PersonID']
        column3 = data['EmployeeNum']
        column4 = data['EmployedDate']
        column5 = data['TerminatedDate']
        
        sql_query = "INSERT INTO Employee (PersonID, EmployeeNum, EmployedDate, TerminatedDate) VALUES (?, ?, ?, ?)"
        cursor.execute(sql_query, (column2, column3, column4, column5))
        conn.commit()
        
        return jsonify({'message': 'Record created successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})
    





# READ operation
@app.route('/read', methods=['GET'])
def read_records():
    try:
        sql_query = "SELECT * FROM Employee"
        cursor.execute(sql_query)
        records = cursor.fetchall()
        
        results = []
        for record in records:
            results.append({'EmployeeID': record.EmployeeID, 'PersonID': record.PersonID, 'EmployeeNum': record.EmployeeNum, 'EmployedDate': record.EmployedDate, 'TerminatedDate': record.TerminatedDate})
        
        return jsonify({'data': results})
    except Exception as e:
        return jsonify({'error': str(e)})
    





# UPDATE operation
@app.route('/update', methods=['PUT'])
def update_record():
    try:
        data = request.get_json()
        column1 = data['EmployeeID']
        column2 = data['TerminatedDate']
        
        sql_query = "UPDATE Employee SET TerminatedDate = ? WHERE EmployeeID = ?"
        cursor.execute(sql_query, (column2, column1))
        conn.commit()
        
        return jsonify({'message': 'Record updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})





# DELETE operation
@app.route('/delete', methods=['DELETE'])
def delete_record():
     try:
         data = request.get_json()
         value_to_delete = data['EmployeeID']
        
         sql_query = "DELETE FROM Employee WHERE EmployeeID = ?"
         cursor.execute(sql_query, (value_to_delete))
         conn.commit()
        
         return jsonify({'message': 'Record deleted successfully'})
     except Exception as e:
         return jsonify({'error': str(e)})



if __name__ == '__main__':
    app.run(debug=True)
