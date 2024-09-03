export default {
	async del_row () {
		
		try{
			
			await delete_row.run()
			showAlert("row deleted","success")

     }catch(error){
				console.log(error)
     }finally{
			 await Select_public_app1.run() // download latest data
		 }
	}
}