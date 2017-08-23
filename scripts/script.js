import $ from 'jquery';

$(function() {

    class Parser {
        constructor() {
            this.input = $('#input');
            this.table = $('#table');
            this.host = $('#host');
            this.enter = $('#enter');
            this.order = $('#order');
            this.exit = $('#exit');
        }

        // 215 60 17 зимние шины
        // http://www.mvo.ru/shini/leto/215-60-R16

        getValue() {
            return this.input.val();
        }


        getHost() {
            return this.host.val();
        }

        getInputArray() {
            const value = this.getValue()
            const rows = value.split("\n");
            return rows;
        }

        renderTable(arr) {
            return this
                .proxyByOrder(arr)
                .map(this.renderRow.bind(this))
                .join('')
        }

        renderRow(row, index) {
            const host = this.getHost();
            console.log(row);
            return `<tr><td>${index}</td><td>${host}<td/></tr>`
        }

        proxyByOrder(arr) {
            return arr.map(row => row.split(' ').filter(Boolean));
        }

        renderOrderPreview(exitArr) {
            const preview = exitArr.map(val => {
                return `
                    <div>
                        <span style='width: 100px;display: inline-block;'>${val}</span>
                        <input class="order" style='width: 20px;'></input>
                        <input class="divider"></input>
                        <input class="change"></input>
                    </div>`
            }).join('')
            this.order.append(`<div id='order_holder'>${preview}</div>`);
        }

        renderOrder() {
            const host = this.getHost();
            const arr = this.getInputArray();
            const ordered = this.proxyByOrder(arr);
            const enter = arr[0]
            const exit = ordered[0]
            this.enter.text(enter)
            this.exit.text(host + exit.join(''))

            this.renderOrderPreview(exit)
        }

        getSettings(orderHolder) {

            let settings = []
            $('#order_holder tr').each(function () {
                let obj = {};
                $this = $(this);
                const input = $this.find('input').val();
                console.log(input, 666)
                settings.push(obj)
            })

            console.log(settings);
        }

        preparse() {
            const order = $('#order_holder');
            if (order) {
                this.getSettings();
            }
            this.renderOrder();
        }

        run() {
            const arr = this.getInputArray();
            this.renderOrder();
            this.table.append(this.renderTable(arr))
        }
    }

    const parser = new Parser();

    const preparseButton = $('#preparse')
    preparseButton.on('click', () => parser.preparse())
    const parseButton = $('#parse')
    parseButton.on('click', () => parser.run())
});
