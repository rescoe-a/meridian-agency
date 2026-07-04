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

  /* ============================================================
     登录弹窗 —— 内部系统入口
     ============================================================ */
  (function initLoginModal() {
    // 动态创建弹窗 HTML
    var overlay = document.createElement('div');
    overlay.className = 'login-overlay';
    overlay.id = 'login-overlay';
    overlay.innerHTML =
      '<div class="login-modal">' +
        '<button type="button" class="login-modal-close" id="login-modal-close">&times;</button>' +
        '<div class="login-modal-title">账号登录</div>' +
        '<div class="form-group">' +
          '<label for="login-id">ID</label>' +
          '<input type="text" id="login-id" placeholder="请输入您的ID号">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="login-password">密码</label>' +
          '<input type="password" id="login-password" placeholder="请输入密码">' +
        '</div>' +
        '<button type="button" class="login-submit" id="login-submit-btn">验证</button>' +
        '<div class="login-feedback" id="login-feedback"></div>' +
      '</div>';
    document.body.appendChild(overlay);

    var loginTrigger = document.getElementById('login-trigger');
    var loginOverlay = document.getElementById('login-overlay');
    var loginClose   = document.getElementById('login-modal-close');
    var loginSubmit  = document.getElementById('login-submit-btn');
    var loginId      = document.getElementById('login-id');
    var loginPw      = document.getElementById('login-password');
    var loginFb      = document.getElementById('login-feedback');

    // 打开弹窗
    if (loginTrigger) {
      loginTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        loginOverlay.classList.add('active');
        // 重置状态
        loginFb.className = 'login-feedback';
        loginFb.textContent = '';
        loginId.value = '';
        loginPw.value = '';
        // 自动聚焦到 ID 输入框
        setTimeout(function () { loginId.focus(); }, 150);
      });
    }

    // 关闭弹窗
    function closeModal() {
      loginOverlay.classList.remove('active');
    }

    if (loginClose) {
      loginClose.addEventListener('click', closeModal);
    }

    loginOverlay.addEventListener('click', function (e) {
      if (e.target === loginOverlay) {
        closeModal();
      }
    });

    // ESC 关闭
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && loginOverlay.classList.contains('active')) {
        closeModal();
      }
    });

    // 提交验证
    if (loginSubmit) {
      loginSubmit.addEventListener('click', function () {
        var id  = loginId.value.trim();
        var pw  = loginPw.value.trim();

        // 空值校验
        if (!id || !pw) {
          loginFb.className = 'login-feedback error';
          loginFb.textContent = '请输入 ID 和密码。';
          return;
        }

        // 模拟验证
        loginFb.className = 'login-feedback info';
        loginFb.textContent = '验证中……';
        loginSubmit.disabled = true;
        loginSubmit.textContent = '请稍候';

        setTimeout(function () {
          // 验证凭证
          if (id === '579462073' && pw === 'CAM7H6G1TH') {
            // 验证成功
            loginFb.className = 'login-feedback success';
            loginFb.textContent = '验证成功——凭证有效。';
            loginSubmit.disabled = true;
            loginSubmit.textContent = '进入中';
            sessionStorage.setItem('meridian_auth', '1');
            sessionStorage.setItem('meridian_user', id);
            // 计算 internal/ 的相对路径
            var segs = window.location.pathname.split('/').filter(function(s) {
              return s && s.indexOf('.') === -1;
            });
            var internalPath = segs.length <= 1 ? 'internal/' : '../internal/';
            setTimeout(function () {
              window.location.href = internalPath;
            }, 1000);
          } else {
            // 验证失败
            loginFb.className = 'login-feedback error';
            loginFb.textContent = '访问被拒绝 —— 凭证无效。';
            loginSubmit.disabled = false;
            loginSubmit.textContent = '验证';
          }
        }, 1500);
      });

      // 回车提交
      loginPw.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          loginSubmit.click();
        }
      });
      loginId.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          loginPw.focus();
        }
      });
    }
  })();

});
