export default {

	async add_row () {
		try{
		 await add_new_row.run()
			await Select_public_app1.run()
			showAlert("row has been added!")
     }catch(error){
			 console.log("error",error)
		showAlert(error.message)
     }
	}
}