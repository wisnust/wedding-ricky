'use strict';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAm05fI_oYuaknsHRZ-V5XprwansegNbvs",
    authDomain: "wedding-lili-c6cb7.firebaseapp.com",
    databaseURL: "https://wedding-lili-c6cb7.firebaseio.com",
    projectId: "wedding-lili-c6cb7",
    storageBucket: "wedding-lili-c6cb7.appspot.com",
    messagingSenderId: "408146927393"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var settings = { timestampsInSnapshots: true };
db.settings(settings);

class TableInvitation extends React.Component {

    state = {
        invitations: [],
        searchResult: [],
        searchQuery: '',
        isLoading: false,
    }

    componentWillMount() {
        self = this

        self.setState({
            isLoading: true
        })

        db.collection("invitations").get().then((querySnapshot) => {
            const invitations = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                data.createdAt = data.createdAt.toDate()
                data.formatedDate = data.createdAt.toLocaleString()
                invitations.push(data)
            });

            self.setState({
                invitations: invitations,
                isLoading: false
            })
        })
    }

    handleSearch(e) {
        const query = e.target.value
        const result = this.state.invitations.filter(invitation => (
            invitation.name.indexOf(query) > -1 || invitation.email.indexOf(query) > -1 ||
            invitation.message.indexOf(query) > -1
        ))
        self.setState({
            searchQuery: query,
            searchResult: result,
        })
    }

    get rows() {
        const invitations = this.state.searchQuery === '' ? this.state.invitations : this.state.searchResult

        return this.state.isLoading
            ? (
                <tr align="center">
                    <td colSpan={5}>Sedang Memuat...</td>
                </tr>
            )
            : invitations.map((invitation, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{invitation.name}</td>
                    <td>{invitation.email}</td>
                    <td>{invitation.phone}</td>
                    <td>{invitation.message}</td>
                    <td>{invitation.formatedDate}</td>
                </tr>
            ))
    }

    render() {
        return (
            <div id="table-invitation">
                <input type="search" className="form-control" onChange={this.handleSearch.bind(this)} placeholder="Cari disini..." />
                <br />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Pesan / Kesan</th>
                            <th>Waktu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

class App extends React.Component {

    render() {
        return (
            <div>
                <h1 align="center">Daftar Undangan</h1>
                <TableInvitation />
            </div>
        )
    }
}

// Render App Component
var container = document.getElementById('app')
ReactDOM.render(<App />, container);
