({
    openAccountForm: function(component, event, helper) {
        let modalBody;
        let modalFooter;
        $A.createComponents([
            ["c:apexAccountForm",{}]
        ],
         function(components, status){
             if (status === "SUCCESS") {
                 modalBody = components[0];
                 component.find('overlayLib').showCustomModal({
                     header: "Account",
                     body: modalBody,
                     footer: modalFooter,
                     showCloseButton: true,
                     });
                    }
                });
       
     },

    init : function(component, event, helper) {

        let actions = [{label:"Edit" ,name:"edit"},
                       {label:"Delete", name:"delete"}
                    ]

        component.set('v.columns',[
            {label:'Account Name', fieldName:'linkName', type:'url',typeAttributes: { label: { fieldName : 'Name' }, target:'_blank'}},
            {label:'Account Number', fieldName:'AccountNumber'},
            {label:'Annual Revenue', fieldName:'AnnualRevenue', cellAttributes: { alignment: 'left' }},
            {label:'Type', fieldName:'Type' },
            {type:'action', typeAttributes: {rowActions : actions}}
            
        ]);

        let action = component.get("c.accountDetails");
        action.setParams({
            "offset" : 0
        });
        action.setCallback(this, function(response){
            let state = response.getState();


            if (state === "SUCCESS"){
                console.log(response.getReturnValue());
                let record = response.getReturnValue();
                record.forEach(function(records){
                    records.linkName = '/' + records.Id;
                });
                component.set("v.details", record);

            }
        });
        $A.enqueueAction(action);

        let action1 = component.get("c.accountCount");
        action1.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.count", response.getReturnValue());
            }
        });
        $A.enqueueAction(action1);
    },
    
    handleRowAction : function(component, event, helper){

        let action = event.getParam('action');
        let row = event.getParam('row');
        let recId = row.Id;
        console.log("RecordId: " + recId);

        switch(action.name){
            
            case 'edit' : 
            let editRecordEvent = $A.get("e.force:editRecord");
            editRecordEvent.setParams({
                "recordId": recId,
            });
            console.log("Edit Fire");
            editRecordEvent.fire();
            break;

            case 'delete' : 
            if(confirm('Are you sure you want to delete this account ? ')){
            let action = component.get("c.deleteAccount");
            action.setParams({acc : row});
            console.log("Delete Case ");
            action.setCallback(this, function(response){
                let state = response.getState();
                console.log("Action");
                if(state == 'SUCCESS'){
                    component.find('notifLib').showToast({
                        "variant": "Success",
                        "title": "Account Deleted Successfully !!!",
                        "message": "Account Deleted Successfully !!!"
                    })
                } else{
                    component.find('notifLib').showToast({
                        "variant": "Error",
                        "title": "Account Deletion Failed !!!",
                        "message": "Account Deletion Failed !!!"
                    })
                }
            });
            $A.enqueueAction(action);
            break;
            }       
        }
    },
    loadMoreData : function(component, event, helper){
        console.log("Load More function Executed!!!");
        let offset = component.get("v.offset");

        let count = component.get("v.count");

        if(offset < (count-20)){
            offset+=20;
            component.set("v.offset" , offset)
            

            let action = component.get("c.accountDetails");
            action.setParams({
                "offset" : offset
            });
            action.setCallback(this, function(response){
                let state = response.getState();
                if(state === "SUCCESS"){
                    let newData = component.get("v.details");
                    // console.log("NewData : " + newData);
                    let record = response.getReturnValue();
                    record.forEach(function(records){
                        records.linkName = '/' + records.Id;
                    });
                    // console.log(response.getReturnValue());
                    newData.push(...response.getReturnValue());
                    component.set("v.details", newData);
                }

            });
            $A.enqueueAction(action);
        }   
    },
    onToggle : function(component, event, helper){
        console.log("Onclick Toggle!!!!");
        let isVisible = component.get("v.isVisible");
        component.set("v.isVisible", !isVisible);
        console.log("IsVisible " + isVisible);
        component.set("v.offset" , 0);

        let action = component.get("c.accountDetails");
        action.setParams({
            "offset" : 0
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            console.log("State" + state);
            if(state === "SUCCESS"){
                let record = response.getReturnValue();
                record.forEach(function(records){
                    records.linkName = '/' + records.Id;
                });
                component.set("v.details", record);
                // component.set("v.disable", true);
            }
        });
        $A.enqueueAction(action);

    },
    handlePrevious : function(component, event, helper){
        console.log("Previous Button Pressed!!!!");
        let offset = component.get("v.offset");
        let count = component.get("v.count");
        console.log(offset);
        console.log(count);

        if(offset >= 20){
            offset -= 20;
            component.set("v.offset", offset);
            console.log("OFFSET ON PREVIOUS : " + offset);
            
            let action = component.get("c.accountDetails");
            action.setParams({
                "offset" : offset
            });

            action.setCallback(this, function(response){
                let state = response.getState();
                if(state === "SUCCESS"){
                    let record = response.getReturnValue();
                    record.forEach(function(records){
                        records.linkName = '/' + records.Id;
                    });
                    component.set("v.details", response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
        }
        // else{
        //     component.set("v.disable", true);
        // }

    },
    handleNext : function(component, event, helper){
        console.log("Next Button Pressed !!!");
        let offset = component.get("v.offset");
        let count = component.get("v.count");
        console.log(offset);
        console.log(count);

        if(offset < (count - 20)){
            offset += 20;
            component.set("v.offset", offset);
            console.log("OFFSET : " + offset);
            // component.set("v.disable", false);

            let action = component.get("c.accountDetails");
            action.setParams({
                "offset" : offset
            });


            action.setCallback(this, function(response){
                let state = response.getState();
                console.log(state);
                if(state === "SUCCESS"){
                    let record = response.getReturnValue();
                    record.forEach(function(records){
                        records.linkName = '/' + records.Id;
                    });
                    component.set("v.details", response.getReturnValue());
                }

            });
            $A.enqueueAction(action); 

        }
    }
})