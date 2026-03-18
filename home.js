const urlParams = new URLSearchParams(window.location.search);
const firstname = urlParams.get('firstname');
const salary = urlParams.get('salary');

if (firstname) {
    document.getElementById('name').textContent = `Hey ${firstname} 👋🏻`;
}

if (salary) {
    const salaryAmount = parseFloat(salary);
    if (!isNaN(salaryAmount)) {
        document.getElementById('salary').textContent = '$' + salaryAmount.toFixed(2);
    }
}

let assets = [];
let liabilities = [];

let networth = 0;
document.getElementById('net').textContent = '$0.00';

function showAddAsset() {
    document.getElementById('assetModal').style.display = 'block';
    document.getElementById('assetName').focus();
}

function closeAssetModal() {
    document.getElementById('assetModal').style.display = 'none';
    clearAssetInputs();
}

function showAddLiability() {
    document.getElementById('liabilityModal').style.display = 'block';
    document.getElementById('liabilityName').focus();
}

function closeLiabilityModal() {
    document.getElementById('liabilityModal').style.display = 'none';
    clearLiabilityInputs();
}

function clearAssetInputs() {
    document.getElementById('assetName').value = '';
    document.getElementById('assetAmount').value = '';
}

function clearLiabilityInputs() {
    document.getElementById('liabilityName').value = '';
    document.getElementById('liabilityAmount').value = '';
}

function addAsset() {
    const name = document.getElementById('assetName').value.trim();
    const amount = parseFloat(document.getElementById('assetAmount').value);
    
    if (!name) {
        alert('Please enter an asset name');
        return;
    }

    if (!amount || amount < 0) {
        alert('Please enter a valid amount');
        return;
    }

    assets.push({ id: Date.now(), name, amount });
    updateAssetList();
    updateNetworth();
    closeAssetModal();
}

function addLiability() {
    const name = document.getElementById('liabilityName').value.trim();
    const amount = parseFloat(document.getElementById('liabilityAmount').value);
    
    if (!name) {
        alert('Please enter a liability name');
        return;
    }

    if (!amount || amount < 0) {
        alert('Please enter a valid amount');
        return;
    }

    liabilities.push({ id: Date.now(), name, amount });
    updateLiabilityList();
    updateNetworth();
    closeLiabilityModal();
}

function removeAsset(id) {
    assets = assets.filter(asset => asset.id !== id);
    updateAssetList();
    updateNetworth();
}

function removeLiability(id) {
    liabilities = liabilities.filter(liability => liability.id !== id);
    updateLiabilityList();
    updateNetworth();
}

function updateAssetList() {
    const assetsList = document.getElementById('assets-list');
    assetsList.innerHTML = '';
    
    if (assets.length === 0) {
        assetsList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No assets added yet</p>';
        return;
    }

    assets.forEach(asset => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <span class="item-name">${escapeHtml(asset.name)}</span>
            <span class="item-amount">$${asset.amount.toFixed(2)}</span>
            <button class="remove-btn" onclick="removeAsset(${asset.id})">×</button>
        `;
        assetsList.appendChild(item);
    });
}

function updateLiabilityList() {
    const liabilitiesList = document.getElementById('liabilities-list');
    liabilitiesList.innerHTML = '';
    
    if (liabilities.length === 0) {
        liabilitiesList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No liabilities added yet</p>';
        return;
    }

    liabilities.forEach(liability => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <span class="item-name">${escapeHtml(liability.name)}</span>
            <span class="item-amount">$${liability.amount.toFixed(2)}</span>
            <button class="remove-btn" onclick="removeLiability(${liability.id})">×</button>
        `;
        liabilitiesList.appendChild(item);
    });
}

function updateNetworth() {
    const totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
    networth = totalAssets - totalLiabilities;
    
    const networthElement = document.getElementById('net');
    networthElement.textContent = '$' + networth.toFixed(2);
    
    if (networth >= 0) {
        networthElement.style.color = '#62B6CB';
    } else {
        networthElement.style.color = '#ff6b6b';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.onclick = function(event) {
    const assetModal = document.getElementById('assetModal');
    const liabilityModal = document.getElementById('liabilityModal');
    
    if (event.target === assetModal) {
        closeAssetModal();
    }
    if (event.target === liabilityModal) {
        closeLiabilityModal();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('assetName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') document.getElementById('assetAmount').focus();
    });
    document.getElementById('assetAmount').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addAsset();
    });
    document.getElementById('liabilityName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') document.getElementById('liabilityAmount').focus();
    });
    document.getElementById('liabilityAmount').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addLiability();
    });
});