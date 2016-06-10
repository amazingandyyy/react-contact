var Root = React.createClass({
    render: function() {
        return (
            <div>
                <Title/>
            </div>
        )
    }
})

var Title = React.createClass({
    getInitialState: function() {
        return {contacts: [], uuid: 0}
    },
    render: function() {
        return (
            <div className="row">
                <div className="four columns">
                    <h4>Contacts</h4>
                    <h6> by <a href="http://amazingandyyy.github.io/" target="_blank">Amazingandyyy</a></h6>
                    <form onSubmit={this.addContact}>
                        <input id="newName" className="u-full-width" type="text" placeholder="name" required/><br/>
                        <input id="newEmail" className="u-full-width" type="text" placeholder="e@mail.com" required/><br/>
                        <input className="button-primary" type="submit" value="Add contact"/>
                    </form>
                </div>
                <div className="eight columns">
                    <table className="u-full-width">
                        <thead>
                            <tr>
                                <th>index</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.contacts.map(contact => {
                                document.getElementById('newName').value = '';
                                document.getElementById('newEmail').value = '';
                                setTimeout(function() {
                                    document.getElementById('newName').focus();
                                }, 10)
                                return (
                                    <tr key={contact.uuid}>
                                        <td>{contact.uuid}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>
                                            <button data-uuid={contact.uuid} onClick={this.deleteContact}>delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    },
    // <button key={contact.uuid} onClick={this.deleteContact(contact.uuid)}>delete</button>

    // ()=>{return this.deleteContact(contact.uuid)}
    deleteContact: function(e) {
        var UUID = Number(e.target.getAttribute('data-uuid'));
        console.log('delete clicked: ', UUID);
        console.log('this.state.contacts: ', this.state.contacts);
        this.setState({
            contacts: this.state.contacts.filter(contact => {
                return contact.uuid !== UUID;
            })
        })

    },
    addContact: function(e) {
        e.preventDefault();
        let newContact = {
            name: document.getElementById('newName').value,
            email: document.getElementById('newEmail').value,
            uuid: this.state.uuid
        }
        this.setState({
            contacts: this.state.contacts.concat(newContact),
            uuid: this.state.uuid + 1
        })
    }
})


var Storage = {
    get: function() {
        try {
            var contacts = JSON.parse(localStorage.contacts);
            console.log(contacts);
        } catch (err) {
            console.log('create localStorage.contacts');
            var contacts = [];
        }
        return contacts;
    },
    write: function(contact) {
        try {
            localStorage.contacts = JSON.stringify(contact);
        } catch (err) {
            console.log("JSON Error: ", err);
        };
    }
};

ReactDOM.render(
    <Root/>, document.getElementById('r'))
