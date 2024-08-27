export default {
	
	async myFun2 () {
		
	
		if (Select_public_app1.isLoading === false) {
		try{
			await read_db.run()
			showAlert("all good")

     }catch(error){
			showAlert("some issue")
     }
		}
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
	}
}