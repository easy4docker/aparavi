var app = {
    list: []
};
$( document ).ready(function() {
    app.loadData = function() {
        var me = this;
        $.ajax({
            type: "POST",
            url: '/api',
            data:{
                command: 'uploadData'
            },
            success: function(data) {
                me.searchData(null);
            },
            dataType: 'json'
          });
    }
    app.searchData = function(name) {
        var me = this;
        $.ajax({
            type: "POST",
            url: '/api',
            data:{
                command: 'searchByName',
                name : name
            },
            success: function(data) {
                me.showData(data.results[1]);
            },
            dataType: 'json'
          });
    }
    app.deleteById = function(id) {
        var me = this;
        $.ajax({
            type: "POST",
            url: '/api',
            data:{
                command: 'deleteById',
                name : id
            },
            success: function(data) {
                me.searchData();
            },
            dataType: 'json'
          });
    }
    app.showData = function(list) {
        var str = '';
        for (var i = 0; i < list.length; i++) {
            str+='<br/>' + list[i].id + '-' +  list[i].name + '-' +  list[i].create_at + '-' +  list[i].review
            str+= '<a href="JavaScript: void(0)" onClick="app.deleteById(' +list[i].id + ')">Delete</a>'
        }
        $('#resultList').html(str);
    }
});
