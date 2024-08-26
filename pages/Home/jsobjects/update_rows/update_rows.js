export default {
	async update () {
		try{
		await Update_public_app1.run()
			showAlert(`rows has been updated`)
		}catch(e){
			showAlert(`error upading rows ${e.message}`)
		}
	}
}