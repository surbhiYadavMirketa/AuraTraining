({
    doInit : function(component, event, helper){
        // console.log("doinit handler");
        let accountId = component.get('v.recordId');
        console.log("Account ID :" +  accountId);
        if(accountId){
            let action = component.get("c.getAccount");
            action.setParams({accountId : accountId});
            console.log("Account ID if condition : " + accountId);
            action.setCallback(this, function(response){
                let state = response.getState();
                if(state == 'SUCCESS'){
                    let record = response.getReturnValue();
                    component.set("v.acc", record);
                    console.log("record DOINIT : " + record);
                }
            });
            $A.enqueueAction(action);
        }
       

    },
    save : function(component, event, helper) {

        // Calling the apex class method 
        let action = component.get("c.createAccount");

        // Passing account attribute to the apex class 
        action.setParams({acc : component.get("v.acc")});

        console.log("Save clicked!!!");
        action.setCallback(this, function(response){
        let state = response.getState();

        if (state === "SUCCESS") {
            component.find('notifLib').showToast({
                "variant": "Success",
                "title": "Account Created",
                "message": "Successfully Account Created !!!"
            })
            let navService = component.find("navService");        
            let pageReference = {
                // to navigate to home page use type standard_objectPage and actionName home and to navigate to particular record see below 
                type: 'standard__recordPage',         
                attributes: {              
                    "recordId": response.getReturnValue(),
                    objectApiName:'Account',
                    actionName: 'view'                             
                }        
            };
            //event.preventDefault();
            component.set("v.pageReference",pageReference);
            navService.navigate(pageReference); 
        }
                    
        else if (state === "ERROR") {
                        
            let errors = response.getError();
                        
            alert(JSON.stringify(errors));
        }

    });
    $A.enqueueAction(action);

    }
})