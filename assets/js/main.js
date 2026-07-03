/**
 * 经纬报社 · MERIDIAN AGENCY — Main Scripts
 * 保持克制——老派网站不需要过多交互
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     页脚年份自动更新
     ============================================================ */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ============================================================
     投稿表单——模拟提交（不真实发送数据）
     ============================================================ */
  var submitForm = document.getElementById('submission-form');
  if (submitForm) {
    submitForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var feedback = document.getElementById('form-feedback');
      var name = document.getElementById('submitter-name').value.trim();
      var email = document.getElementById('submitter-email').value.trim();
      var content = document.getElementById('submission-content').value.trim();

      // 简单前端校验
      if (!name || !email || !content) {
        feedback.className = 'form-feedback error';
        feedback.textContent = '请填写所有必填字段（姓名、电子邮箱、投稿内容）。';
        feedback.style.display = 'block';
        feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // 模拟提交成功
      feedback.className = 'form-feedback success';
      feedback.textContent = '您的投稿已收到。编辑部将在 7-14 个工作日内完成初审，如通过将邮件通知您。感谢您对经纬报社的信任。';
      feedback.style.display = 'block';
      feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // 清空表单（可选——注释掉以保留填写内容供演示）
      // submitForm.reset();

      // 3 秒后自动隐藏反馈信息
      setTimeout(function () {
        feedback.style.display = 'none';
      }, 8000);
    });
  }

  /* ============================================================
     档案检索——简单客户端筛选
     ============================================================ */
  var archiveSearch = document.getElementById('archive-search-input');
  if (archiveSearch) {
    archiveSearch.addEventListener('input', function () {
      var query = this.value.toLowerCase().trim();
      var rows = document.querySelectorAll('.archive-table tbody tr');

      rows.forEach(function (row) {
        var text = row.textContent.toLowerCase();
        if (query === '' || text.indexOf(query) !== -1) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });

      // 更新结果计数
      var countEl = document.getElementById('archive-result-count');
      if (countEl) {
        var visible = document.querySelectorAll('.archive-table tbody tr[style=""]').length;
        var total = rows.length;
        if (query === '') {
          countEl.textContent = '共 ' + total + ' 条档案记录';
        } else {
          countEl.textContent = '找到 ' + visible + ' 条匹配记录（共 ' + total + ' 条）';
        }
      }
    });
  }

  /* ============================================================
     分类筛选标签——专栏列表页
     ============================================================ */
  var filterTags = document.querySelectorAll('.listing-filters .filter-tag');
  if (filterTags.length > 0) {
    filterTags.forEach(function (tag) {
      tag.addEventListener('click', function (e) {
        e.preventDefault();

        // 更新 active 状态
        filterTags.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');

        var category = this.getAttribute('data-filter');
        var items = document.querySelectorAll('.article-list-item[data-category]');

        items.forEach(function (item) {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

});
