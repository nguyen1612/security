const md5 = require('md5');

(async () => {
    const getClientNonce = () => {
        const num = 64;
        return Math.floor(
            (Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1)
        ).toString();
    }
    const getServerNonce = async () => {
        const data = await fetch(
            "http://localhost:3000/util/nonce",
            {
                method: "GET"
            }
        );
        return (await data.json()).nonce;
    }
    const genSign = async (params) => {
        const keyToken = 'anc';
        const stime = Date.now();
        const cnonce = getClientNonce();
        const snonce = await getServerNonce();

        params.stime = stime;
        params.cnonce = cnonce;
        params.snonce = snonce;
        const sortedKeys = [];

        for (const key in params) {
            sortedKeys.push(key);
        }
        sortedKeys.sort();
        let result = '';
        sortedKeys.forEach(key => {
            result += key + params[key];
        });
        result += keyToken;
        const sign = md5(result).toString();
        console.log(result);

        return { sign, stime, cnonce, snonce };
    }
    const genQuery = (params) => {
        const result = new URLSearchParams(params);
        return result.toString();
    }

    const params = {
        username: "hello",
        password: "123"
    }
    const data = await genSign(params);
    const query = genQuery(data);

    // console.log(query);
    // console.log(data);

    const total = 1;
    for (let i = 0; i < total; i++) {
        const res = await fetch(
            `http://localhost:3000/v1/login?${query}`,
            {
                method: "POST", body: JSON.stringify(params),
                headers: {
                    'Content-Type':'application/json'
                },
            }
        );
        console.log(await res.json());
    }

})();

