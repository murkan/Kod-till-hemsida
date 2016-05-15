var ChatEngine=function(){
     var name=" ";
     var msg="";
     var chatZone=document.getElementById("chatZone");
     var oldata ="";
     var sevr=" ";
     var xhr=" ";

     this.init=function(){
          if(EventSource){
          this.setName();
          this.initSevr(); 
          } else{
          alert("Use latest Chrome or FireFox");
        }
     };
     //Skriv in användarnamn... Om inget skrivs i användarnamsboxen, byt namn till Annonymous
     this.setName=function(){
          name = prompt("Skriv in ett nickname","Annonymous");
          if (!name || name ==="") {
             name = "Annonymous";  
          }
          name = name.replace(/(<([^>]+)>)/ig,"");
     };
     //Funktionen för att skicka meddelande
     this.sendMsg=function(){ 
          msg=document.getElementById("msg").value;
          chatZone.innerHTML+='<div class="chatmsg"><b>'+name+'</b>: '+msg+'<br/></div>';
          oldata='<div class="chatmsg"><b>'+name+'</b>: '+msg+'<br/></div>';          
          this.ajaxSent();  
          return false;
     };
     // Skicka meddelande till servern
     this.ajaxSent=function(){
          try{
               xhr=new XMLHttpRequest();
          }
          catch(err){
               alert(err);
          }
          xhr.open('GET','chatprocess.php?msg='+msg+'&name='+name,false);
          xhr.onreadystatechange = function(){
               if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                         msg.value="";
                    }
               }     
          };
          xhr.send();
     };
     this.initSevr=function(){
          sevr = new EventSource('chatprocess.php');
          sevr.onmessage = function(e){ 
          if(oldata!=e.data){
               chatZone.innerHTML+=e.data;
               oldata = e.data;
          }
          };     
     };
};
// Skapa object för "ChatEngine"
var chat= new ChatEngine();
chat.init();