const url = 'http://localhost:5000'

function bufferToArr(buf) {
	temparr = new Uint8Array(buf);
	arr = [];
	for (i = 0; i < temparr.length; i++) {
		arr.push(temparr[i]);
	}
	return arr;
}

function arrToBuffer(arr) {
	let array = Uint8Array.from(arr);
	return array.buffer;
}

function AuthenticatorAssertionResponse(authenticatorData, clientDataJSON, signature, userHandle) {
	this.authenticatorData = authenticatorData;
	this.clientDataJSON = clientDataJSON;
	this.signature = signature;
	this.userHandle = userHandle;
}

class PublicKeyCredential {

	constructor(authenticatorAttachment, id, rawId, response, type) {
		this.authenticatorAttachment = authenticatorAttachment;
		this.id = id;
		this.rawId = rawId;
		this.response = response;
		this.type = type;
	}

	static async isConditionalMediationAvailable() {
		return false;
	}

	static async isUserVerifyingPlatformAuthenticatorAvailable() {
		return true;
	}

	getClientExtensionResults() {
		return {}
	}

}

var zzz;
var res1;
class cred {

	static async get(options) {
		console.log("Get called");
		console.log(options);
		const x = options;
		var rpid = encodeURIComponent(location.origin);
		zzz = options;
		const cred1 = x['publicKey']['allowCredentials']
		const chal = x['publicKey']['challenge']
		const len = cred1.length;
		var publicKey = {};
		var ac = [];
		cred1.forEach(credproc);

		function credproc(item) {
			try {
				var cr = {};
				cr['type'] = item['type']
				if ('transports' in item) {
					cr['transports'] = item['transports']
				}
				cr['id'] = bufferToArr(item['id']);
				ac.push(cr);
			} catch (err) {
				console.log(err);
			}
		}
		const challenge = bufferToArr(chal);
		var extensions = {};
		if ('extensions' in x['publicKey']) {
			const ext = x['publicKey']['extensions']
			if ('appid' in ext) {
				extensions['appid'] = ext['appid'];
			}
			publicKey['extensions'] = extensions;
		}
		const rpId = x['publicKey']['rpId'];
		const timeout = x['publicKey']['timeout'];
		const userVerification = x['publicKey']['userVerification'];
		publicKey['allowCredentials'] = ac;
		publicKey['challenge'] = challenge;
		publicKey['rpId'] = rpId;
		publicKey['timeout'] = timeout;
		publicKey['userVerification'] = userVerification;
		const tempdata = publicKey;
		console.log(tempdata);
		const response = await fetch(url + '/getoptions?site=' + rpid, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(tempdata)
		});
		const pkcred = await response.json();
		console.log(pkcred);
		res1 = pkcred;
		const reqresp = pkcred;
		const reqrespresp = reqresp['response'];
		var aresp = {};
		aresp['authenticatorData'] = arrToBuffer(reqrespresp['authenticatorData']);
		aresp['clientDataJSON'] = arrToBuffer(reqrespresp['clientDataJSON']);
		aresp['signature'] = arrToBuffer(reqrespresp['signature']);
		aresp['userHandle'] = arrToBuffer(reqrespresp['userHandle']);
		const aresp1 = new AuthenticatorAssertionResponse(aresp['authenticatorData'], aresp['clientDataJSON'], aresp['signature'], aresp['userHandle']);
		var finresp = {};
		finresp['authenticatorAttachment'] = reqresp['authenticatorAttachment'];
		finresp['id'] = reqresp['id'];
		finresp['rawId'] = arrToBuffer(reqresp['rawId']);
		finresp['type'] = reqresp['type'];
		finresp['response'] = aresp;
		const finr = new PublicKeyCredential(finresp['authenticatorAttachment'], finresp['id'], finresp['rawId'], aresp1, finresp['type']);
		console.log(finr);
		return finr;
	}

	static create() {
		console.log("Create call");
	}
}

class navigator {
	static {
		console.log("Navigator");
	}
}
navigator.credentials = cred;