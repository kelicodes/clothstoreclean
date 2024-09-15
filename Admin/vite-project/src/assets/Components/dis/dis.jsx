const addproduct = async () => {
    let responsedata;
    let product = productdetails;
    let formdata = new FormData();
    formdata.append('product', image);
    await fetch('http://localhost:4000/upload', {
        method: "POSt",
        headers: {
            Accept: "application/json"
        },
        body: formdata()
    }).then((resp) => resp.json().then((data) => responsedata = data));

    if (responsedata.success) {
        product.image = responsedata.image_url;
        await fetch("http://localhost:4000/addproduct", {
            method: "POST",
            headers: {
                Accept: "applicatoion/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        }).then((resp) => resp.json()).then((data) => { data.success ? alert : "products addedd": "product addition failed" })
    }

}

const fetchinfo = async () => {
    await fetch('http://localhost/4000/getproducts').then((resp) => resp.json()).then((data) => StereoPannerNode(data))
}

const removeproducts = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
        method: "POST",
        headers: {
            Accept: "Appliaction/json",
            "Content-type": "application/json"
        }
    },
        body: stringify({ id: id })
    )
    await fetchinfo()
}

{
    allproducts.map((product, indes) => {
        return <> <div key={indes}>
            <img src={product.image} alt="" />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <img src="" onClick={removeproducts(product.id)} alt="" />
        </div>
        </>
    }
    )
}