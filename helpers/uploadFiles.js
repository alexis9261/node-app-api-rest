const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, allowedEstensions = ['png', 'jpg', 'jpeg'], folder = '' ) => {

    return new Promise( (resolve, reject) => {
        const { archivo } = files;
        const nameCut   = archivo.name.split('.');
        const extension = nameCut[ nameCut.length - 1 ];
    
        if(!allowedEstensions.includes(extension)) {
            return reject(`La extension ${extension} no esta permitida: ${allowedEstensions}`);
        }
    
        const newNameFile = uuidv4() + '.' + extension;
        uploadPath = path.join(__dirname, folder , newNameFile);
      
        archivo.mv(uploadPath, (err) => {
          if (err) { return reject(err); }
      
          resolve(newNameFile);
        });

    });

}

module.exports = {
    uploadFile
}