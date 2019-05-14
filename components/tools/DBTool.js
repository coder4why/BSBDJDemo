
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase('video.db', '1.0', '', 1);

export const  DBTool = {

    //创建表：
    createTable(){
        db.transaction(function (txn) {
            txn.executeSql('CREATE TABLE IF NOT EXISTS Video(video_id INTEGER PRIMARY KEY NOT NULL,userName VARCHAR(30),content VARCHAR(30), imageUrl VARCHAR(30), videoUrl VARCHAR(30))', []);
        });
    },

    queryExist(videoUrl,callBack){
        
        const sql = `SELECT * FROM Video WHERE videoUrl= '${videoUrl}'` ;
        db.transaction(function (txn) {
             txn.executeSql(sql,[],(tx,results)=>{
                if(results.rows.length>0){
                    callBack(true);
                }else{
                    callBack(false);
                }
             });
        });
    },

    deleteVideo(videoUrl){
        // var that = this;
        this.queryExist(videoUrl,function(isExist){
            if(isExist==false){
                return;
            }
            db.transaction(function (txn) {
                const sql = `DELETE FROM Video WHERE videoUrl = '${videoUrl}'`;
                txn.executeSql(sql,[],(tx,results)=>{
                });
            });

        })
    },


    //增：
    insertVideo(userName,content,imageUrl,videoUrl){

        var that = this;
        this.queryExist(videoUrl,function(isExist){
            if(isExist==true){
                that.deleteVideo(videoUrl);
                return;
            }
            
            db.transaction(function (txn) {
                const sql = `INSERT INTO Video (userName,content,imageUrl,videoUrl) VALUES('${userName}','${content}','${imageUrl}','${videoUrl}' )`;
                txn.executeSql(sql,[],(tx,results)=>{
                });
            });
        })
        
    },

    queryVideo(callBack){
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM Video', [], function (tx, res) {
                var videos = [];
                for (let i = 0; i < res.rows.length; ++i) {
                    // console.log('item:', res.rows.item(i));
                    videos.push(res.rows.item(i));
                }
                callBack(videos);
            });
        });
    }

}

