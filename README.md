Golden-Shoe
            db.collection("products").doc(group).collection(cat).doc(prompt("Enter Details")).set(doc.data()).then(function() {
                console.log("Document successfully written!");
            });