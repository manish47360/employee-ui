var api_url = "http://localhost:8083/employees"

$(document).ready(function(){
    $.ajax({
        url: api_url,
        success: function(result){
            console.log(result);
            var data = "";
            result.forEach(elm => {
                data += "<tr><td>"+elm['id']+"</td><td>"+elm['name']+"</td><td>"+elm['salary']+"</td><td>"+elm['address']+"</td><td><a href='editEmp.html?"+elm['id']+"'>Edit</a>&nbsp;&nbsp;<a href='#' onClick='deleteEmp("+elm['id']+")'>Delete</a></td></tr>";
            });
            $(".empTable").append(data)
        }
    });

    var id = window.location.search.substring(1);
    console.log(id)
    if(id > 0){
        $.ajax({
            url: api_url+"/"+id,
            success: function(result){
                console.log(result)
                $("#name").val(result.name);
                $("#salary").val(result.salary);
                $("#address").val(result.address);
                $("#empId").val(result.id)
            }
        });
    }
})

$(".empForm").submit(function(e){
    e.preventDefault();
    var data = {};
    data['name'] = $("#name").val();
    data['salary'] = $("#salary").val();
    data['address'] = $("#address").val();
    console.log(data)
    $.ajax({
        url: api_url,
        method: "POST",
        headers: {"Content-Type":"application/json"},
        data: JSON.stringify(data),
        success: function(result){
            window.location.href="index.html"
        }
    });
})

$(".empEditForm").submit(function(e){
    e.preventDefault();
    var data = {};
    data['name'] = $("#name").val();
    data['salary'] = $("#salary").val();
    data['address'] = $("#address").val();
    console.log(data)
    $.ajax({
        url: api_url+"/"+$("#empId").val(),
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        data: JSON.stringify(data),
        success: function(result){
            window.location.href="index.html"
        }
    });
})

function deleteEmp(id) {
    if(confirm("Are you sure, you want to Delete this Employee?")){
        $.ajax({
            url: api_url+"/"+id,
            method: "DELETE",
            success: function(result){
                window.location.href="index.html"
            }
        });
    }
}
