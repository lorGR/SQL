import express from "express";
import { connection } from "../../DB/databaseSQL";

export async function getProductsByType(req: express.Request, res: express.Response) {
    try {
        const { storeType } = req.body;
        if (!storeType) throw new Error("Couldn't receive data from req.body");

        if (storeType !== "mac" && storeType !== "iphone" && storeType !== "ipad" &&
            storeType !== "apple_watch" && storeType !== "air_pods" && storeType !== "apple_tv") {
            const sql = `SELECT DISTINCT name, price ,price_eilat, type
            FROM products
            WHERE name LIKE '%${storeType}%'`;

            await connection.query(sql, (error, result) => {
                try {
                    if(error) throw error;
                    res.send({result});
                } catch (error) {
                    res.status(500).send({ error: error.message });
                }
            })
        } else {
            const sql = `
                SELECT DISTINCT name, price ,price_eilat, type
                FROM products
                WHERE type = '${storeType}'`;
            await connection.query(sql, (error, result) => {
                try {
                    if (error) throw error;
                    res.send({ result });
                } catch (error) {
                    res.status(500).send({ error: error.message });
                }
            });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function getProductInfo(req: express.Request, res: express.Response) {
    try {
        const { productName, storeType } = req.body;
        if (!productName || !storeType) throw new Error("Couldn't receive product or storeType from req.body");

        const sql = `SELECT DISTINCT price, price_eilat, storage, model, screen_size, network, description FROM products WHERE type = '${storeType}' AND name = '${productName}'`;

        await connection.query(sql, (error, result) => {
            try {
                if (error) throw error;
                res.send({ result });

            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function getProductColors(req: express.Request, res: express.Response) {
    try {
        const { productName, storeType } = req.body;
        if (!productName || !storeType) throw new Error("Couldn't receive productName or storeType from req.body");

        const sql = `SELECT DISTINCT color, display_img FROM products WHERE type = '${storeType}' AND name = '${productName}'`;

        await connection.query(sql, (error, result) => {
            try {
                if (error) throw error;
                res.send({ result });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function getProductId(req: express.Request, res: express.Response) {
    try {
        const { productColor, productModel, productStorage, productScreenSize, productName, storeType } = req.body;
        if (storeType === "mac") {
            if (productName !== "Mac Mini" && productName !== "Mac Pro" && productName !== "Mac Studio") {
                const sql = `SELECT product_id FROM products WHERE color = '${productColor}' AND model = '${productModel}'`;
                connection.query(sql, (error, result) => {
                    try {
                        if (error) throw error;
                        const prodId = result[0];
                        res.send({ prodId });
                    } catch (error) {
                        res.status(500).send({ error: error.message });
                    }
                });
            } else {

                const sql = `SELECT product_id FROM products WHERE name = '${productName}' AND model = '${productModel}' `;
                connection.query(sql, (error, result) => {
                    try {
                        if (error) throw error;
                        const prodId = result[0];
                        res.send({ prodId });
                    } catch (error) {
                        res.status(500).send({ error: error.message });
                    }
                })
            }
        } else if (storeType === "iphone" || storeType === "ipad" || storeType === "apple_tv") {
            const sql = `SELECT product_id FROM products WHERE color = '${productColor}' AND storage = '${productStorage}' AND name = '${productName}'`;
            connection.query(sql, (error, result) => {
                try {
                    if (error) throw error;
                    const prodId = result[0];
                    res.send({ prodId });
                } catch (error) {
                    res.status(500).send({ error: error.message });
                }
            });
        } else if (storeType === "apple_watch") {
            const sql = `SELECT product_id FROM products WHERE color = '${productColor}' AND screen_size = '${productScreenSize}' and name = '${productName}'`;
            connection.query(sql, (error, result) => {
                try {
                    if (error) throw error;
                    const prodId = result[0];
                    res.send({ prodId });
                } catch (error) {
                    res.status(500).send({ error: error.message });
                }
            });
        } else if (storeType === "air_pods" && productName === "AirPods Max") {
            try {
                console.log(productName);
                const sql = `SELECT product_id FROM products WHERE color = '${productColor}' AND name = '${productName}'`;
                connection.query(sql, (error, result) => {
                    try {
                        if (error) throw error;
                        const prodId = result[0];
                        res.send({ prodId });
                    } catch (error) {
                        res.status(500).send({ error: error.message });
                    }
                });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        } else {
            const sql = `SELECT product_id FROM products WHERE name = '${productName}'`;
            connection.query(sql, (error, result) => {
                try {
                    if (error) throw error;
                    const prodId = result[0];
                    res.send({ prodId });
                } catch (error) {
                    res.status(500).send({ error: error.message });
                }
            });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function addToCart(req: express.Request, res: express.Response) {
    try {
        const { productId, userId } = req.body;
        if (!productId || !userId) throw new Error("Couldn't receive productId or userId from req.body Ctrl: addToCart");
        const sql = `INSERT INTO cart(user_id, product_id) VALUES('${userId}', '${productId}')`;
        connection.query(sql, (error, result) => {
            try {
                if (error) throw error;
                res.send({ msg: "product was added" });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function getUserProducts(req: express.Request, res: express.Response) {
    try {
        const { userId } = req.body;
        if (!userId) throw new Error("Couldn't receive userId from req.body Ctrl: getUserProducts");

        const sql = `SELECT * FROM products WHERE product_id IN (SELECT product_id FROM cart WHERE user_id = '${userId}')`;
        connection.query(sql, (error, result) => {
            try {
                if (error) throw error;
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function getProductPreviewImg(req: express.Request, res: express.Response) {
    try {
        const { productName } = req.body;
        if (!productName) throw new Error("Couldn't receive produceName from req.body Ctrl getProductPreviewImg ");

        const sql = `SELECT preview_img FROM products WHERE name = '${productName}' LIMIT 1`;

        connection.query(sql, (error, result) => {
            try {
                if (error) throw error;
                res.send({ result });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function deleteProductFromCart(req: express.Request, res: express.Response) {
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) throw new Error("Couldn't receive userId or productId from req.body Ctrl deleteProductFromCart");

        const sql = `DELETE FROM cart WHERE product_id = '${productId}' AND user_id = '${userId}'`;

        connection.query(sql, (error, result) => {
            try {
                if (error) throw error;
                res.send({ result });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function getProductsPrice(req: express.Request, res: express.Response) {
    try {
        const { userId } = req.body;
        if (!userId) throw new Error("Couldn't receive userId from req.body Ctrl: getUserProducts");

        const sql = `SELECT * FROM products WHERE product_id IN (SELECT product_id FROM cart WHERE user_id = '${userId}')`;
        connection.query(sql, (error, result) => {
            try {
                if (error) throw error;
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function deleteProductsFromCart(req: express.Request, res: express.Response) {
    try {
        const { userId } = req.body;
        if (!userId) throw new Error("Couldn't receive userId from req.body");

        const sql = `DELETE FROM cart WHERE user_id = '${userId}'`;
        connection.query(sql, (error) => {
            try {
                if (error) throw error;
                res.send({ bought: true });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function getProductsBySearch(req: express.Request, res: express.Response) {
    try {
        const { userSearch } = req.body;
        if (!userSearch) throw new Error("Couldn't receive userSerach from req.body");

        const sql = `SELECT DISTINCT name, price, price_eilat FROM products WHERE name LIKE '%${userSearch}%'`;

        connection.query(sql, (error, result) => {
            try {
                if (error) throw error;
                res.send({ result });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}