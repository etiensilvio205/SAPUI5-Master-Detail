sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/Panel",
   "sap/m/MessageToast"
], function (Controller,Panel, MessageToast) {
   "use strict";
   return Controller.extend("SplitApp.controller.Detail", {
      onInit: function () {
    	  this.getView().byId("tools").setVisible(false);
    	  this.getView().byId("headerPanel").setVisible(false);
    	
      },
      
      addNode:function(oEvent){
  		
		  var oform =sap.ui.xmlfragment("fragDetail","SplitApp.fragments.Form",this);
	  	 
		  
		  var odetailView =sap.ui.getCore().byId("detail");
	  	  var oContent=odetailView.byId("myContent");
	  	  
	  	  oContent.destroyItems();
	 oContent.addItem(oform); 
	  	
  
  
  	  
		
	},
	SavePress:function(){
	  	  
	    
	      var name=sap.ui.core.Fragment.byId("fragDetail","name").getValue(); 
		  var id=sap.ui.core.Fragment.byId("fragDetail","id").getValue();
	  	  var house=sap.ui.core.Fragment.byId("fragDetail","house").getSelectedItem().getText();
	  	  var email=sap.ui.core.Fragment.byId("fragDetail","email").getValue();
	  	  var address=sap.ui.core.Fragment.byId("fragDetail","address").getValue();
	  	  var owl=sap.ui.core.Fragment.byId("fragDetail","owl").getValue();
	  	  var phone=sap.ui.core.Fragment.byId("fragDetail","phone").getValue();
	  	  var manager=sap.ui.core.Fragment.byId("fragDetail","manager").getValue();
	  	  var age=sap.ui.core.Fragment.byId("fragDetail","age").getValue();
	  
	  	 if(name!==""&&age!==""&&address!==""&&house!==""&&email!==""&&owl!==""&&phone!==""&&manager!==""&&id!==""){	  
	  	  var model=sap.ui.getCore().byId("master").getModel("data");
	  	  var aEmployee = model.getProperty("/Employee");
	   	 var oNewEmployee =

	  	  {

	  			  
					      
					      "Info":{
					         "Name": name,
					         "ID": id,
					         "Age":age,
					         "Address":address,
					         "House":house,
					         "Manager":manager
					         },
					         "Contacts":{
					         "Email":email,
					         "Phone":phone,
					         "Owl":owl
					        }
					      
	  	 

	  	  }

	  	  aEmployee.push(oNewEmployee);
	

	  	  model.setProperty("/Employee", aEmployee);
	  	  
	  	 
	  	  
  var odetails=sap.ui.xmlfragment("fragInfos","SplitApp.fragments.Detail",this);
 
    
		  var odetailView =sap.ui.getCore().byId("detail");
	  	  var oContent=odetailView.byId("myContent");
	  	  
	  	  oContent.destroyItems();
	      var status=oContent.addItem(odetails);
	  	  
	     
	    
			
	  	var alert="Employee added successfully!";
	  	MessageToast.show(alert,{at:"center"});
	  	}
	  	 else{
	  		 
	  		 
	  		var alert="All the fields are required!";
		  	MessageToast.show(alert,{at:"center"});
	  	 }
	  	 
	  	 
	  	 
	    },
	    
	    deleteNode:function(){
	    	
	    	
	    	var model=sap.ui.getCore().byId("master").getModel("data");
	    	var aItems = model.getProperty("/Employee");
	    	var onDisplay=sap.ui.getCore().byId("detail").getModel().getProperty("/");
	    	
	    	
	    	
	    	for (var i=0;i<aItems.length;i++){
	    		
	    		if (aItems[i].Info.ID==onDisplay.Info.ID){
	    			
	    			aItems.splice(i, 1);
	    			model.setProperty("/Employee", aItems);
	    			this.getView().byId("headerPanel").setVisible(false);
	    			this.getView().byId("tools").setVisible(false);
	    			break;
	    			
	    		}
	    		
	    		
	    	}
	 
	    	
	    	/*var aItems = model.getProperty("/Employee");
	    	aItems.splice(onDisplay, 1);
	    	model.setProperty("/Employee", aItems);*/
	    	
	    	
	    	
	    	
	    },
	    
	    editNode:function(){
	    	
	  var oform =sap.ui.xmlfragment("fragEdit","SplitApp.fragments.Edit",this);
	  	 
		  
		  var odetailView =sap.ui.getCore().byId("detail");
	  	  var oContent=odetailView.byId("myContent");
	  	  
	  	  oContent.destroyItems();
	  	  oContent.addItem(oform); 
	  	
	    	
	    	
	    },
	    
	    SaveEdit:function(){
	    	  var name=sap.ui.core.Fragment.byId("fragEdit","name").getValue(); 
			  var id=sap.ui.core.Fragment.byId("fragEdit","id").getValue();
		  	  var house=sap.ui.core.Fragment.byId("fragEdit","house").getSelectedItem().getText();
		  	  var email=sap.ui.core.Fragment.byId("fragEdit","email").getValue();
		  	  var address=sap.ui.core.Fragment.byId("fragEdit","address").getValue();
		  	  var owl=sap.ui.core.Fragment.byId("fragEdit","owl").getValue();
		  	  var phone=sap.ui.core.Fragment.byId("fragEdit","phone").getValue();
		  	  var manager=sap.ui.core.Fragment.byId("fragEdit","manager").getValue();
		  	  var age=sap.ui.core.Fragment.byId("fragEdit","age").getValue();
		  
		  	 if(name!==""&&age!==""&&address!==""&&house!==""&&email!==""&&owl!==""&&phone!==""&&manager!==""&&id!==""){	  	  
		  	  var model=sap.ui.getCore().byId("master").getModel("data");
		  	  var aEmployee = model.getProperty("/Employee");
		  	var onDisplay=sap.ui.getCore().byId("detail").getModel().getProperty("/");
		  	
			for (var i=0;i<aEmployee.length;i++){
	    		
	    		if (aEmployee[i].Info.ID==onDisplay.Info.ID){
	    			
	    			aEmployee[i].Info.ID=id;
	    			aEmployee[i].Info.Name=name;
	    			aEmployee[i].Info.House=house;
	    			aEmployee[i].Info.Address=address;
	    			aEmployee[i].Info.Manager=manager;
	    			aEmployee[i].Info.Age=age;
	    			aEmployee[i].Contacts.Phone=phone;
	    			aEmployee[i].Contacts.Owl=owl;
	    			aEmployee[i].Contacts.Email=email;
	    			
	    			model.setProperty("/Employee", aEmployee);
	    			break;
	    			this.getView().byId("headerPanel").setVisible(false);
	    			this.getView().byId("tools").setVisible(false);
	    			
	    			
	    		}
	    		
	    		
	    	}
	  
			/*
		   	onDisplay.Info.ID=id;
			onDisplay.Info.Name=name;
			onDisplay.Info.House=house;
			onDisplay.Info.Address=address;
			onDisplay.Info.Manager=manager;
			onDisplay.Info.Age=age;
			onDisplay.Contacts.Phone=phone;
			onDisplay.Contacts.Owl=owl;
			onDisplay.Contacts.Email=email;
			
		*/
		  	 
		  	  
	  var odetails=sap.ui.xmlfragment("fragInfos","SplitApp.fragments.Detail",this);
	 
	    
			  var odetailView =sap.ui.getCore().byId("detail");
		  	  var oContent=odetailView.byId("myContent");
		  	  
		  	  oContent.destroyItems();
		      var status=oContent.addItem(odetails);
		  	  
		  	 
		  	var alert="Edited successfully!";
		  	MessageToast.show(alert,{at:"center"});
		  	}
		  	 else{
		  		 
		  		var alert="All the fields are required!";
			  	MessageToast.show(alert,{at:"center"});
		  		 
		  	 }
	    	
	    	
	    	
	    },
	    
	    cancelHandle:function(){
	    	
	    	var odetails=sap.ui.xmlfragment("fragInfos","SplitApp.fragments.Detail",this);
	   	 
		    
			  var odetailView =sap.ui.getCore().byId("detail");
		  	  var oContent=odetailView.byId("myContent");
		  	  
		  	  oContent.destroyItems();
		      var status=oContent.addItem(odetails);
		  	  
	    	
	    }
   });
});
