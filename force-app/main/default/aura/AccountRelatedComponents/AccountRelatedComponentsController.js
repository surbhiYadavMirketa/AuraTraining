({
	myAction : function(component, event, helper) {
		var conList = component.get("c.getContacts");
        conList.setParams({
            AccountId : component.get("v.recordId")
        });
        conList.setCallback(this,function(data){
            component.set("v.contactList",data.getReturnValue());
        });
        $A.enqueueAction(conList);
	}
})