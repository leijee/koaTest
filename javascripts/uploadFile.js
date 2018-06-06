const multer = require('koa-multer');
const router = require('koa-router')();

// const uploads = multer({ dest: 'public/uploadFiles/' });

var storage = multer.diskStorage({
	//文件保存路径
	destination: function (req, file, cb) {
		console.log(file);
		let fileType = file.mimetype.split('/')[0];
		console.log(fileType);
		if(fileType!='image'){//上传的图片格式不正确
			cb(null, '')
		}else{
			cb(null, 'public/uploadFiles/')
		}
	},
	//修改文件名称
	filename: function (req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		cb(null,fileFormat[0] + "." + fileFormat[fileFormat.length - 1]);
	}
})
//加载配置
var uploads = multer({ storage: storage });

router.post('/upload', uploads.single('filename'),async (ctx,next) => {
	console.log(ctx);
	let fileObj = ctx.req.file;
	let fileType = fileObj.mimetype.split('/')[0];
	if(fileType!='image'){//上传的图片格式不正确
		ctx.body = {
			code:-1,
			message:'文件格式错误，不是图片类型',
			imgUrl:''
		};
		return ;
	}
	console.log(fileObj.size/1024);
	ctx.body = {
		code:'1',
		message:'上传成功',
		imgUrl:'/uploadFiles/'+fileObj.originalname
	};

})
module.exports = router
