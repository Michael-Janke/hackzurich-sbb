from flask import Flask
from flask import request
import csv
import json
app = Flask(__name__)

csvfile = open('objectstream.csv', 'r')
objectReader = csv.reader(csvfile, delimiter=',', quotechar='|')

@app.route("/")
def hello():
        return "Hello World"

@app.route("/objects")
def objects():
    date = request.args.get('date', '')
    result = {}
    csvfile.seek(0)
    for row in objectReader:
        if(row[0].startswith(date)):
            if not row[1] in result:
                result[row[1]] = {"start" : row[0], "path": []}
            result[row[1]]["path"].append([int(float(row[2])), int(float(row[3]))])
    return json.dumps(result)

if __name__=='__main__':
    app.run(debug=True)