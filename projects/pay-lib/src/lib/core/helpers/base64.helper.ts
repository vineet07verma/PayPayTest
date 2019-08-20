export class Base64Helper {
    public static ReadAsBinaryString(file, callback) {
        var reader = new FileReader();
		if (reader.readAsBinaryString) {
			reader.onload = (readerEvt) => {
				callback(btoa(readerEvt['target']['result']));
			}
			reader.readAsBinaryString(file);
		 } else {
			// Catering for IE 10/11
			reader.onload = (readerEvt) => {
				var binary = "";
				const bytes = new Uint8Array(readerEvt['target']['result']);
				var length = bytes.byteLength;
				for (var i = 0; i < length; i++) {
					binary += String.fromCharCode(bytes[i]);
				}
				callback(btoa(binary));
			}
			reader.readAsArrayBuffer(file);
		}
    }

    public static ReadAsDataURL(file, callback) {
        var reader = new FileReader();
		reader.onload = (readerEvt) => {
            callback(readerEvt['target']['result']);
        }
        reader.readAsDataURL(file);
    }
}