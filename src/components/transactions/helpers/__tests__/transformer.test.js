const transformer = require("../transformer");

describe("Helpers > transformer", () => {

    it("Should not call associated service 'login' in case of empty body", async () => {

        const expectedResult = [
            {
                "acc_number": "000000002",
                "amount": "11",
                "transactions": [
                    {
                        "label": "label 2",
                        "amount": "60",
                        "currency": "EUR"
                    },
                    {
                        "label": "label 8",
                        "amount": "-32",
                        "currency": "EUR"
                    },
                    {
                        "label": "label 1",
                        "amount": "-25",
                        "currency": "EUR"
                    },
                    {
                        "label": "label 9",
                        "amount": "8",
                        "currency": "EUR"
                    },
                ],
            },
        ];

        const transactions = {
            "000000002":
                {
                    "1": [
                        {
                            "id": 1,
                            "label": "label 2",
                            "sign": "CDT",
                            "amount": "60",
                            "currency": "EUR"
                        },
                        {
                            "id": 2,
                            "label": "label 8",
                            "sign": "DBT",
                            "amount": "32",
                            "currency": "EUR"
                        },
                        {
                            "id": 3,
                            "label": "label 1",
                            "sign": "DBT",
                            "amount": "25",
                            "currency": "EUR"
                        },
                        {
                            "id": 3,
                            "label": "label 1",
                            "sign": "DBT",
                            "amount": "25",
                            "currency": "EUR"
                        }
                    ],
                    "2": [
                        {
                            "id": 3,
                            "label": "label 1",
                            "sign": "DBT",
                            "amount": "25",
                            "currency": "EUR"
                        },
                        {
                            "id": 4,
                            "label": "label 9",
                            "sign": "CDT",
                            "amount": "8",
                            "currency": "EUR"
                        }
                    ]
                }
        };

        expect(transformer(transactions)).toEqual(expectedResult);
    });
});
