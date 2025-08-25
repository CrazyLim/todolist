# Git 安装指南（Windows系统）

## 1. 下载Git安装包
访问Git官方下载页面：<mcurl name="Git Downloads" url="https://git-scm.com/downloads"></mcurl> <mcreference link="https://git-scm.com/downloads" index="1">1</mcreference>

在下载页面中，找到Windows平台的下载选项：
- 点击"Windows"选项卡
- 根据您的系统位数选择64位或32位安装包（大多数现代电脑为64位）
- 下载会自动开始，或点击提供的下载链接手动开始下载

## 2. 安装Git
下载完成后，找到下载的安装包（通常在"下载"文件夹中），双击运行安装程序：

1. 欢迎界面：点击"Next"继续
2. 许可协议：阅读后点击"I Agree"
3. 选择安装路径：建议使用默认路径，点击"Next"
4. 选择组件：保持默认选项，点击"Next"
5. 开始菜单文件夹：点击"Next"
6. 选择Git的默认编辑器：可根据个人喜好选择，推荐保持默认的Vim
7. 调整PATH环境：推荐选择"Git from the command line and also from 3rd-party software"，这样可以在任何地方使用Git命令 <mcreference link="https://blog.csdn.net/qq_41918107/article/details/137904621" index="4">4</mcreference>
8. 选择HTTPS传输后端：选择"Use the native Windows Secure Channel library"
9. 配置行尾符号转换：选择"Checkout Windows-style, commit Unix-style line endings"
10. 选择终端模拟器：选择"Use MinTTY (the default terminal of MSYS2)"
11. 选择额外选项：保持默认，点击"Next"
12. 配置实验性功能：保持默认，点击"Install"

## 3. 验证Git安装
安装完成后，验证Git是否成功安装：

1. 打开命令提示符（Win+R，输入cmd，回车）或Git Bash
2. 输入以下命令并按回车：
   ```
   git --version
   ```
3. 如果成功显示Git版本号（如"git version 2.50.1.windows.1"），则表示安装成功 <mcreference link="https://blog.csdn.net/Songqiang777/article/details/137400970" index="5">5</mcreference>

## 4. 初始配置（可选）
安装完成后，建议进行基本配置：

```bash
# 设置用户名
git config --global user.name "Your Name"

# 设置邮箱
git config --global user.email "your.email@example.com"

# 查看配置
git config --list
```

更多详细信息，请参考Git官方文档：<mcurl name="Git Documentation" url="https://git-scm.com/doc"></mcurl>