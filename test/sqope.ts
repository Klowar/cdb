export function ast() {
    this.objects = [];
    this.tree = {
        type: 'root',
        elems: []
    };
    this.add = function(elem) {
        this.objects.push(elem);
        console.log(this.objects);
    };
}