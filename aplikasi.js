const StorageCtrl = (function(){
    return {
        produk: function(item){
            let items;

            if(localStorage.getItem('items') === null){
                items = [];

                items.push(item);

                localStorage.setItem('items', JSON.stringify(items));
            }else{
                items = JSON.parse(localStorage.getItem('items'));
                items.push(item);

                localStorage.setItem('items', JSON.stringify(items));
            }
        },

        getItemsFromStorage: function(){
            let items;

            if(localStorage.getItem('items') === null){
                items = [];
            }else{
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },

        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            });

            localStorage.setItem('items', JSON.stringify(items));
        },

        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            });

            localStorage.setItem('items', JSON.stringify(items));
        },

        clearItemsFromStorage: function(){
            localStorage.removeItem('items');
        }
    }
})();

const itemCtrl = (function(){
    const Item = function(id, nama, harga){
		this.ID    = ID;
        this.namaProduk    = namaProduk;
        this.hargaProduk  = hargaProduk;
        this.kategoriProduk = kategoriProduk;
    }

    const data = {

        items: StorageCtrl.getItemsFromStorage(), 
        currentItem: null,
        totalHarga: 0
    }

    return{
        getItems : function(){
            return data.items;
        },
        addItem: function(namaProduk, hargaProduk, kategoriProduk){
            let ID;

            if(data.items.length > 0){
                ID = data.items[data.items.length -1].id + 1;
            }else{
                ID = 0;
            }

            harga = parseInt(harga);
            newItem = new Item(ID, namaProduk, hargaProduk, kategoriProduk);
            data.items.push(newItem);
            return newItem;
        },

        getItemById: function(id){
            //untuk ID
            let found = null;

            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });

            return found;
        },

        updateItem: function(namaProduk, hargaProduk, kategoriProduk){
            hargaProduk = parseInt(hargaProduk);

            let found = null;

            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.namaProduk = namaProduk;
                    item.hargaProduk = hargaProduk;
					item.kategoriProduk = kategoriProduk;
                    found = item;
                }
            });

            return found;
        },

        deleteitem: function(id){
            //Get ID
            const ids = data.items.map(function(item){
                return item.id;
            });

            const index = ids.indexOf(id);
            data.items.splice(index, 1);
        },

        setCurrentItem: function(item){
            data.currentItem = item;
        },

        getCurrentItem: function(){
            return data.currentItem;
        },

        getTotalHarga: function(){
            let total = 0;

            //looping item dan tambah class
            data.items.forEach(function(item){
                total += item.hargaProduk;
            });

            //set total data
            data.totalHarga = total;

            //return total
            return data.totalHarga;
        },
        
        logData: function(){
            return data;
        }
    }
})();

const UICtrl = (function(){
    const UISelector = {
        itemList       : '#item-list',
        addBtn         : '.add-btn',
        listItems      : '#item-list li',
        updateBtn      : '.update-btn',
        deleteBtn      : '.delete-btn',
        backBtn        : '.back-btn',
        clearBtn        : '.clear-btn',
        itemNamaProduk  : '#nama_produk',
        itemHargaProduk : '#harga_produk',
		itemKategoriProduk : '#kategori_produk',
        totalHarga     : '.total_harga'
    }

    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.namaProduk}</strong><em>Rp. ${item.hargaProduk}</em><em>Rp. ${item.kategoriProduk}</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`;
            });

            document.querySelector(UISelector.itemList).innerHTML = html;
        },
        getItemsInput: function(){
            return{
                namaProduk: document.querySelector(UISelector.itemNamaProduk).value,
                hargaProduk: document.querySelector(UISelector.itemHargaProduk).value,
				kategoriProduk: document.querySelector(UISelector.itemKategoriProduk).value,
            }
        },

        addListItem: function(item){
            document.querySelector(UISelector.itemList).style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.namaProduk}</strong><em>Rp. ${item.hargaProduk}</em>
			<em>Rp. ${item.kategoriProduk}</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;

            document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend', li)
        },

        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelector.listItems);

            listItems = Array.from(listItems);
            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `<li class="collection-item" id="item-${item.id}">
                    <strong>${item.namaProduk}</strong><em>Rp. ${item.hargaProduk}</em><em>Rp. ${item.kategoriProduk}</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>`;
                }
            });
        },

        deleteListItem: function(id){
            const itemID = `#item-${id}`;

            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput: function(){
            document.querySelector(UISelector.itemNamaProduk).value = '';
            document.querySelector(UISelector.itemHargaProduk).value = '';
			document.querySelector(UISelector.itemKategoriProduk).value = '';
        },

        addItemToForm: function(){
            document.querySelector(UISelector.itemNamaProduk).value = itemCtrl.getCurrentItem().namaProduk;
            document.querySelector(UISelector.itemHargaProduk).value = itemCtrl.getCurrentItem().hargaProduk;
			document.querySelector(UISelector.itemKategoriProduk).value = itemCtrl.getCurrentItem().kategoriProduk;

            UICtrl.showEditState();
        },

        hideList: function(){
            document.querySelector(UISelector.itemList).style.display = 'none';
        },

        showTotalHarga: function(totalHarga){
            document.querySelector(UISelector.totalHarga).textContent = totalHarga;
        },

        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelector.updateBtn).style.display = 'none';
            document.querySelector(UISelector.deleteBtn).style.display = 'none';
            document.querySelector(UISelector.backBtn).style.display = 'none';
            document.querySelector(UISelector.addBtn).style.display = 'inline';
        },

        showEditState: function(){
            document.querySelector(UISelector.updateBtn).style.display = 'inline';
            document.querySelector(UISelector.deleteBtn).style.display = 'inline';
            document.querySelector(UISelector.backBtn).style.display = 'inline';
            document.querySelector(UISelector.addBtn).style.display = 'none';
        },
        getSelectors: function(){
            return UISelector;
        }
    }
})();

const App = (function(itemCtrl, StorageCtrl, UICtrl){
    const loadEventListener = function(){
        const UISelector = UICtrl.getSelectors();

        //Simpan data
        document.querySelector(UISelector.addBtn).addEventListener('click', itemAddSubmit);
        //Agar Enter tidak berfungsi
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault;
                return false;
            }
        });
        //Edit klik data insert to form
        document.querySelector(UISelector.itemList).addEventListener('click', itemEditClick);
        //Untuk update data
        document.querySelector(UISelector.updateBtn).addEventListener('click', itemUpdateSubmit);
        //Delete button
        document.querySelector(UISelector.deleteBtn).addEventListener('click', itemDeleteSubmit);
        //back button event
        document.querySelector(UISelector.backBtn).addEventListener('click', UICtrl.clearEditState);
        //clear button
        document.querySelector(UISelector.clearBtn).addEventListener('click', clearAllItemClick);
    }

    const itemAddSubmit = function(e){
        const input = UICtrl.getItemsInput();

        if(input.namaProduk !== '' && input.hargaProduk !== '' && input.kategoriProduk !== ''){
            const newItem = itemCtrl.addItem(input.namaProduk, input.hargaProduk, input.kategoriProduk);

            UICtrl.addListItem(newItem);

            const totalHarga = itemCtrl.getTotalHarga();
            
            //add total harga to UI
            UICtrl.showTotalHarga(totalHarga);
			UICtrl.clearInput();
            StorageCtrl.paketKursus(newItem);            
        }
        e.preventDefault();
    }

    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
            //mengambil list item berdasarkan ID
            const listID = e.target.parentNode.parentNode.id;
            //untuk memasukkan kedalam sebuah array
            const listIDArr = listID.split('-');
            //Ambil ID yang sebenarnya
            const ID = parseInt(listIDArr[1]);
            //ambil item
            const itemToEdit = itemCtrl.getItemById(ID);

            itemCtrl.setCurrentItem(itemToEdit);

            UICtrl.addItemToForm()
        }

        e.preventDefault();
    }

    const itemUpdateSubmit = function(e){
        //Untuk mengambil nilai input
        const input = UICtrl.getItemsInput();
        const updatedItem = itemCtrl.updateItem(input.namaProduk, input.hargaProduk, input.kategoriProduk);

        UICtrl.updateListItem(updatedItem);

        const totalHarga = itemCtrl.getTotalHarga();

        UICtrl.showTotalHarga(totalHarga);
        StorageCtrl.updateItemStorage(updatedItem);
        UICtrl.clearEditState();

        e.preventDefault();
    }

    //Delete button event
    const itemDeleteSubmit = function(e){
        //Untuk mengambil item yang ingin dihapus
        const currentItem = itemCtrl.getCurrentItem();

        //Hapus struktur data berdasarkan ID
        itemCtrl.deleteitem(currentItem.id);

        //Untuk menghapus form di UI
        UICtrl.deleteListItem(currentItem.id);

        const totalHarga = itemCtrl.getTotalHarga();

        UICtrl.showTotalHarga(totalHarga);
        StorageCtrl.deleteItemFromStorage(currentItem.id);
        UICtrl.clearEditState();

        e.preventDefault();
    }

    const clearAllItemClick = function(){
        itemCtrl.clearAllItem();

        const totalHarga = itemCtrl.getTotalHarga();
        UICtrl.showTotalHarga(totalHarga);
        UICtrl.removeItems();
        StorageCtrl.clearItemsFromStorage();

        //Hide UI
        UICtrl.hideList;
    }

    return{
        init: function(){
            UICtrl.clearEditState();
            const items = itemCtrl.getItems();

            if(items.length === 0){
                UICtrl.hideList();
            }else{
                UICtrl.populateItemList(items);
            }

            const totalHarga = itemCtrl.getTotalHarga();
            
            //add total harga to UI
            UICtrl.showTotalHarga(totalHarga); 
            loadEventListener();
        }
    }
})(itemCtrl, StorageCtrl, UICtrl);

App.init();