const fileService = require('../services/fileService');
const  User = require('../models/User');
const  File = require('../models/File');

class fileController{
        async createDir(req , res){
            try {
                const  {name , type , parents} = req.body;
                const  file = new File({name , type , parents , user : user.id});
                const parentFile = await  File.findOne({_id : parent});
                if(!parentFile){
                        file.path = name;
                        await fileService.createDir(file);
                }else{
                    file.path = `${parentFile.path}\\${file.name}`;
                    await fileService.createDir(file);
                    parentFile.childs.push(file._id);
                    await  parentFile.save();
                }

                await  file.save();
                return res.json(file);
            }catch (e) {
                console.log(e);
                return res.stack(400).json(e);
            }
        }
}
module.exports = new fileController();