// 监听图片上传
document.getElementById('photoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            displayPhoto(event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// 监听粘贴事件
document.addEventListener('paste', function(e) {
    const items = e.clipboardData.items;
    for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
            const file = item.getAsFile();
            const reader = new FileReader();
            reader.onload = function(event) {
                displayPhoto(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }
});

// 显示照片
function displayPhoto(dataUrl) {
    const photoDisplay = document.getElementById('cardPhotoDisplay');
    photoDisplay.innerHTML = `<img src="${dataUrl}" alt="照片">`;
    saveData();
}

// 实时更新预览
document.getElementById('name').addEventListener('input', function() {
    document.getElementById('cardName').textContent = this.value || '未命名角色';
    saveData();
});

document.getElementById('age').addEventListener('input', function() {
    document.getElementById('cardAge').textContent = this.value || '-';
    saveData();
});

document.getElementById('gender').addEventListener('change', function() {
    document.getElementById('cardGender').textContent = this.value || '-';
    saveData();
});

document.getElementById('level').addEventListener('input', function() {
    document.getElementById('cardLevel').textContent = this.value || '-';
    saveData();
});

document.getElementById('dungeonName').addEventListener('input', function() {
    document.getElementById('cardDungeonName').textContent = this.value || '-';
    saveData();
});

document.getElementById('deathStatus').addEventListener('change', function() {
    const status = document.getElementById('cardDeathStatus');
    status.textContent = this.value;
    if (this.value === '死亡') {
        status.classList.add('dead');
    } else {
        status.classList.remove('dead');
    }
    saveData();
});

document.getElementById('activities').addEventListener('input', function() {
    document.getElementById('cardActivities').textContent = this.value || '暂无记录';
    saveData();
});

// 保存数据到本地存储
function saveData() {
    const data = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        level: document.getElementById('level').value,
        dungeonName: document.getElementById('dungeonName').value,
        deathStatus: document.getElementById('deathStatus').value,
        activities: document.getElementById('activities').value,
        photo: document.getElementById('cardPhotoDisplay').innerHTML
    };
    localStorage.setItem('characterProfile', JSON.stringify(data));
}

// 从本地存储加载数据
function loadData() {
    const data = JSON.parse(localStorage.getItem('characterProfile'));
    if (data) {
        document.getElementById('name').value = data.name || '';
        document.getElementById('age').value = data.age || '';
        document.getElementById('gender').value = data.gender || '';
        document.getElementById('level').value = data.level || '';
        document.getElementById('dungeonName').value = data.dungeonName || '';
        document.getElementById('deathStatus').value = data.deathStatus || '存活';
        document.getElementById('activities').value = data.activities || '';
        
        if (data.photo) {
            document.getElementById('cardPhotoDisplay').innerHTML = data.photo;
        }

        // 更新预览
        document.getElementById('cardName').textContent = data.name || '未命名角色';
        document.getElementById('cardAge').textContent = data.age || '-';
        document.getElementById('cardGender').textContent = data.gender || '-';
        document.getElementById('cardLevel').textContent = data.level || '-';
        document.getElementById('cardDungeonName').textContent = data.dungeonName || '-';
        document.getElementById('cardDeathStatus').textContent = data.deathStatus || '存活';
        
        const statusElement = document.getElementById('cardDeathStatus');
        if (data.deathStatus === '死亡') {
            statusElement.classList.add('dead');
        } else {
            statusElement.classList.remove('dead');
        }
        
        document.getElementById('cardActivities').textContent = data.activities || '暂无记录';
    }
}

// 导出为图片
function exportImage() {
    const cardElement = document.getElementById('cardPreview');
    const fileName = (document.getElementById('name').value || '角色资料卡') + '.png';
    
    html2canvas(cardElement, {
        backgroundColor: '#1a1a1a',
        scale: 2,
        useCORS: true,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = fileName;
        link.click();
    }).catch(err => {
        alert('导出失败，请重试');
        console.error(err);
    });
}

// 重置表单
function resetForm() {
    if (confirm('确定要重置所有数据吗？')) {
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('gender').value = '';
        document.getElementById('level').value = '';
        document.getElementById('dungeonName').value = '';
        document.getElementById('deathStatus').value = '存活';
        document.getElementById('activities').value = '';
        document.getElementById('cardPhotoDisplay').innerHTML = '<span>证件照</span>';

        document.getElementById('cardName').textContent = '未命名角色';
        document.getElementById('cardAge').textContent = '-';
        document.getElementById('cardGender').textContent = '-';
        document.getElementById('cardLevel').textContent = '-';
        document.getElementById('cardDungeonName').textContent = '-';
        document.getElementById('cardDeathStatus').textContent = '存活';
        document.getElementById('cardDeathStatus').classList.remove('dead');
        document.getElementById('cardActivities').textContent = '暂无记录';

        localStorage.removeItem('characterProfile');
    }
}

// 页面加载时恢复数据
window.addEventListener('load', loadData);