({
    handleSubmit : function(component, event, helper) {

        let fields = event.getParam('fields');
        console.log(JSON.stringify(fields));
        event.preventDefault();  //stops the form from being submitted

        

        if(fields.Type && !fields.AccountNumber){

            component.find('notifLib').showNotice({
                "variant": "Error",
                "title": "Something went wrong!!!",
                "message": "Account Number is Mandatory to fill!!!"
            });
            return;
            //alert("Fill account Number");

        }
        
        component.find('myRecordForm').submit();
    }
})