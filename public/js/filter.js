let taxSwitch=document.querySelector("#flexSwitchCheckReverse");
taxSwitch.addEventListener("click",()=>{
    let togItem=document.querySelectorAll(".item-gst");
    console.log(togItem);
    for(info of togItem){
        if(info.style.display!="inline"){
        info.style.display="inline";
        }else{
            info.style.display="none";
        }
    }
});