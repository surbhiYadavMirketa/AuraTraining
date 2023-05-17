({
    checkType : function(component, event, helper) {
        let type = event.getParam("value");
        if(type){
            component.set("v.isMandatory", true)
        }
        else{
            component.set("v.isMandatory", false)
        }
        
    },
    onerror : function(component, event, helper){
        component.find('notifLib').showNotice({
            "variant": "Error",
            "title": "Something went wrong!!!",
            "message": "Account Number is Mandatory to fill!!!"
        })
     },
     onsuccess : function(component,event,helper) {

        let record = event.getParams().response;  
        console.log(record.id);
    
        let navService = component.find("navService");        
        let pageReference = {
            // to navigate to home page use type standard_objectPage and actionName home and to navigate to particular record see below 
            type: 'standard__recordPage',         
            attributes: {              
                "recordId": record.id,
                objectApiName:'Account',
                actionName: 'view'                             
            }        
        };
        //event.preventDefault();
        component.set("v.pageReference",pageReference);
        navService.navigate(pageReference); 
    }
})