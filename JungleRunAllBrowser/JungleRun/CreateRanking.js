/*window.addEventListener("load", displayRanking());

/*
function displayRanking() {
    if( typeof helper == 'undefined' ) {
      var helper = { } ;
    }
    helper.arr = {
     
    multisort: function(arr, columns, order_by) {
        if(typeof columns == 'undefined') {
            columns = []
            for(x=0;x<arr[0].length;x++) {
                columns.push(x);
            }
        }

        if(typeof order_by == 'undefined') {
            order_by = []
            for(x=0;x<arr[0].length;x++) {
                order_by.push('ASC');
            }
        }

        function multisort_recursive(a,b,columns,order_by,index) {  
            var direction = order_by[index] == 'DESC' ? 1 : 0;

            var is_numeric = !isNaN(a[columns[index]]-b[columns[index]]);

            var x = is_numeric ? a[columns[index]] : a[columns[index]].toLowerCase();
            var y = is_numeric ? b[columns[index]] : b[columns[index]].toLowerCase();

            if(!is_numeric) {
                x = helper.string.to_ascii(a[columns[index]].toLowerCase(),-1),
                y = helper.string.to_ascii(b[columns[index]].toLowerCase(),-1);
            }

            if(x < y) {
                    return direction == 0 ? -1 : 1;
            }

            if(x == y)  {
                return columns.length-1 > index ? multisort_recursive(a,b,columns,order_by,index+1) : 0;
            }

            return direction == 0 ? 1 : -1;
        }

        return arr.sort(function (a,b) {
            return multisort_recursive(a,b,columns,order_by,0);
        });
    }
}


    
    var listPlayer = [];
    console.log("localStorage: " + localStorage.length);
    
    for (var i=0; i <= localStorage.length; i++)  {
       var tmp = JSON.parse(localStorage.getItem(i));
        listPlayer[i] = tmp;
        console.log(listPlayer[i]);
    }
    
    var ranking = helper.arr.multisort(listPlayer, ['score', 'pseudo'], ['DESC', 'ASC']);
    listPlayer = ranking;
    console.log("listPlayer: " + listPlayer.length);
    for (var i = 0; i < listPlayer.length; i++) {
        console.log("Ranking "+ i);
        var cur_item = listPlayer[i];
        document.getElementById('ranking').innerHTML += ('<li>'+cur_item.pseudo +" : "+ cur_item.score+'</li>');
    }
	/*maBaseDeDonnees = openDatabase('myDB', '1.0', 'Base de données de stockage pour classement', 2097152); 

	maBaseDeDonnees.transaction(function(tx) {
		tx.executeSql("SELECT * FROM Player ORDER BY Score DESC LIMIT 5", [], function(sqlTransaction, sqlResultSet) {
			var rows = sqlResultSet.rows;
			var len = rows.length;
			for (var i = 0; i < len; i++) {
				var cur_item = rows[i];
				document.getElementById('ranking').innerHTML += ('<li>'+cur_item.Pseudo +" : "+ cur_item.Score+'</li>');
			}
		});
	});
}
*/
