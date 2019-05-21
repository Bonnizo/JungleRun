window.addEventListener("load", displayRanking());

function displayRanking() {

  maBaseDeDonnees = openDatabase('myDB', '1.0', 'Base de données de stockage pour classement', 2097152);

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

