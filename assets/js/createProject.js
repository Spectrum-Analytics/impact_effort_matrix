 var items = [];

function modalfooter(){
  orgNamevalue = document.getElementById('orgName').value;
  orgDesvalue = document.getElementById('orgDes').value;
  items.push( orgNamevalue);
  items.push(orgDesvalue);
  console.log(items);
  return false; // stop submission
} 
