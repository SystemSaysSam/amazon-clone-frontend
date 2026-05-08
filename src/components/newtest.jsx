await fetch('https://amazon-clone-backend-s4ui.onrender.com/orderspage',{
            method:"POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newOrder)

        })