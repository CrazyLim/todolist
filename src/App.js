import React, { useState, useEffect } from 'react';
import TravelPlan from './components/TravelPlan';
import './App.css';

function App() {
  // 登录状态管理
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 任务列表状态
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // 页面状态 - 将旅游计划设置为首页默认展示
  const [activePage, setActivePage] = useState('travel');
  
  // 笑话列表状态
  const [jokes, setJokes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jokesPerPage = 10;
  
  // 初始化任务列表和已完成任务
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedCompletedTasks) {
      setCompletedTasks(JSON.parse(savedCompletedTasks));
    }
  }, []);
  
  // 保存任务列表和已完成任务到本地存储
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);
  
  // 添加任务
  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim(),
        timestamp: new Date().toISOString()
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };
  
  // 处理输入框回车事件
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };
  
  // 完成任务
  const handleCompleteTask = (id) => {
    const taskToComplete = tasks.find(task => task.id === id);
    if (taskToComplete) {
      setCompletedTasks([...completedTasks, {
        ...taskToComplete,
        completedAt: new Date().toISOString()
      }]);
      setTasks(tasks.filter(task => task.id !== id));
    }
  };
  
  // 删除任务
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  // 从历史记录中恢复任务
  const handleRestoreTask = (id) => {
    const taskToRestore = completedTasks.find(task => task.id === id);
    if (taskToRestore) {
      setTasks([...tasks, {
        id: Date.now(), // 生成新的ID以避免冲突
        text: taskToRestore.text,
        timestamp: new Date().toISOString()
      }]);
      setCompletedTasks(completedTasks.filter(task => task.id !== id));
    }
  };
  
  // 登录处理
  const handleLogin = (e) => {
    e.preventDefault();
    
    // 简单的登录验证逻辑（实际项目中应该连接到后端API）
    if (email && password) {
      setIsLoggedIn(true);
      setIsGuest(false);
      setShowLoginModal(false);
      setEmail('');
      setPassword('');
      
      // 加载用户数据
      loadUserData(email);
    }
  };
  
  // 游客登录
  const handleGuestLogin = () => {
    setIsLoggedIn(true);
    setIsGuest(true);
    setShowLoginModal(false);
  };
  
  // 注销
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsGuest(false);
    setEmail('');
    setPassword('');
    
    // 清空用户数据
    setTasks([]);
    setCompletedTasks([]);
    setJokes([]);
    setCurrentPage(1);
  };
  
  // 加载用户数据（模拟）
  const loadUserData = (userEmail) => {
    // 这里模拟从API加载用户数据
    console.log(`加载用户 ${userEmail} 的数据`);
    // 实际项目中，这里应该是API请求
  };
  
  // 生成笑话 - 优化版，避免无限循环
  const generateJokes = () => {
    // 用户提供的100条风格多样的经典笑话
    const jokesList = [
      { id: 'joke-1', category: '动物类', content: '为什么鸡过马路？为了到对面去。' },
      { id: 'joke-2', category: '动物类', content: '两只番茄过马路，一辆汽车飞驰而过，其中一只番茄被压扁了。另一只番茄指着它说："哇！番茄酱！"' },
      { id: 'joke-3', category: '动物类', content: '小鱼问妈妈："妈妈，爸爸呢？" 鱼妈妈："你爸爸正在上课呢！" (上课=上钩)' },
      { id: 'joke-4', category: '动物类', content: '一只北极熊觉得很无聊，就开始拔自己的毛。拔啊拔，最后它说："好冷啊……"' },
      { id: 'joke-5', category: '动物类', content: '为什么海星总是扁扁的？因为它总被海扁。' },
      { id: 'joke-6', category: '动物类', content: '长颈鹿对兔子说："真希望你知道能吃到树顶上的叶子是什么感觉。" 兔子问："是什么感觉？" 长颈鹿："你吐了就知道（吐=兔）。"' },
      { id: 'joke-7', category: '动物类', content: '蜗牛骑自行车，不小心撞到了一只乌龟。乌龟爬起来说："你瞎啊！" 蜗牛说："对不起啊，我不是故意的。" 乌龟说："你瞎！你刚才撞我时明明还瞪着我！"' },
      { id: 'joke-8', category: '动物类', content: '为什么鸭子过马路要一摇一摆？因为如果它不摇不摆，就会掉下来。（指鸭子的走路姿势）' },
      { id: 'joke-9', category: '动物类', content: '一群动物开完派对，最后要付钱的时候，服务员说："你们谁叫的披萨？" 猪和牛都往后退了一步。' },
      { id: 'joke-10', category: '动物类', content: '蜈蚣下班回家，爸爸问："今天怎么回来这么晚？" 蜈蚣说："遇见一个朋友，非让我换新鞋试试，害得我穿了好久。"' },
      { id: 'joke-11', category: '日常生活类', content: '我妈说我是充话费送的，所以我才会天天抱着手机，因为那里面有家的味道。' },
      { id: 'joke-12', category: '日常生活类', content: '今天在街上碰见一个老同学，他说："这么多年了，你一点都没变。" 我正高兴，他接着说："是指智商。"' },
      { id: 'joke-13', category: '日常生活类', content: '我问朋友："你怎么了？" 他回："没事。" 我心里想：没事才怪，中文的\'没事\'=\'有事\'，\'还行\'=\'不好\'，\'怎么了\'=\'快哄我\'。"' },
      { id: 'joke-14', category: '日常生活类', content: '老婆说："老公，街上要是有人跟我搭讪，叫我美女，我该怎么办？" 老公："那还用问？赶紧扶他过马路！他肯定是个瞎子。"' },
      { id: 'joke-15', category: '日常生活类', content: '小时候总是有人问我："你是爸爸孩子还是妈妈孩子？" 我感到很困惑："难道我还能是别人家的孩子？"' },
      { id: 'joke-16', category: '日常生活类', content: '别人都是为怎么挣钱而发愁，我却是为怎么花钱而发愁。二十块钱怎么能花到月底呢？' },
      { id: 'joke-17', category: '日常生活类', content: '和女友吵架，她气得转身就要走。我当即吼道："瓜子脸！" 她一愣，笑了："死鬼，我这是鹅蛋脸！"' },
      { id: 'joke-18', category: '日常生活类', content: '去医院体检，医生拿着我的报告单说："幸好你来得早啊……" 我惊出一身冷汗，医生不慌不忙地说："再晚点，我就下班了。"' },
      { id: 'joke-19', category: '日常生活类', content: '今天看到一对中学生在街上手牵手，不禁想起了中学时代的自己。当年的我，也是在街上看着一对中学生在街上手牵手。' },
      { id: 'joke-20', category: '日常生活类', content: '我妈跟我说，找对象不能光看别人的外表，也要看看自己的外表。' },
      { id: 'joke-21', category: '职场与上学类', content: '程序员面试官："你简历上写着你擅长多种编程语言，能举个例子吗？" 应聘者："C语言、C++、Java、JavaScript、PHP、Python、Perl…" 面试官："好，那你先出去把门带上。" 应聘者："……好的，Shell。"' },
      { id: 'joke-22', category: '职场与上学类', content: '老板："你被开除了！" 员工："为什么？我从来没请过假、没迟到早退、干活任劳任怨……" 老板："正因为这样，我才要开除你——你让我其他的员工压力很大！"' },
      { id: 'joke-23', category: '职场与上学类', content: '上课时，老师讲到"沉默是金"，忽然发现有个学生在睡觉。老师很生气："你怎么上课睡觉？" 学生："我是在践行\'沉默是金\'。"' },
      { id: 'joke-24', category: '职场与上学类', content: '记者问一位大爷："大爷，您保持年轻的秘诀是什么？" 大爷说："上班，熬夜，加班，压力大，揣摩领导心思……" 记者："啊？这是为什么？" 大爷："因为他看起来像60AGES，其实才30出头。"' },
      { id: 'joke-25', category: '职场与上学类', content: '老板今天在会上狠地批评了我，说我做事不过脑子。我气得当场就和他吵了起来："你说我可以，但不能侮辱我！我要是不过脑子，还能站在这里和你吵架？"' },
      { id: 'joke-26', category: '职场与上学类', content: '为什么数学书总是很忧郁？因为它有太多问题（Problem）。' },
      { id: 'joke-27', category: '职场与上学类', content: '"老师，请问这道题怎么做？""你好，我是监考老师。"' },
      { id: 'joke-28', category: '职场与上学类', content: '上班族人生四大悲：上班像鸡一样早起，下班像贼一样晚归，干活像驴一样卖力，发钱像做慈善一样难。' },
      { id: 'joke-29', category: '职场与上学类', content: '同事问我："你工资多少？" 我望着工资条上的3000.0，淡定地说："三万。" 他惊叹："小数点呢？" 我说："什么小数点？没有小数点啊。"' },
      { id: 'joke-30', category: '职场与上学类', content: '客户："这个方案不行，我要的是那种五彩斑斓的黑。" 设计师："……"' },
      { id: 'joke-31', category: '冷笑话/谐音梗', content: '为什么三分熟的牛排和七分熟的牛排在路上相遇不打招呼？因为他们不熟。' },
      { id: 'joke-32', category: '冷笑话/谐音梗', content: '小明去医院看病，医生对他说："你最近是不是总感觉有人跟着你？" 小明惊讶地说："是啊！你怎么知道的？" 医生说："因为我是精神科大夫，而你是来看颈椎病的。"' },
      { id: 'joke-33', category: '冷笑话/谐音梗', content: '一根火柴在路上走，它觉得头很痒，就挠了挠头，然后它着火了。' },
      { id: 'joke-34', category: '冷笑话/谐音梗', content: '你知道为什么广东人这么喜欢吃饭吗？因为"食咗饭未"（吃了吗）是他们打招呼的方式。' },
      { id: 'joke-35', category: '冷笑话/谐音梗', content: '有一天，小鸭对小鸡表白："我爱你。" 小鸡说："你duck不必。"' },
      { id: 'joke-36', category: '冷笑话/谐音梗', content: '为什么阿姨从不流汗？因为她擦了"姨汗净"（谐音"一号净"）。' },
      { id: 'joke-37', category: '冷笑话/谐音梗', content: '螃蟹出门不小心摔了一跤，别人问他怎么了，它说："我没（钳）事。"' },
      { id: 'joke-38', category: '冷笑话/谐音梗', content: '为什么飞机飞那么高都不会撞到星星？因为星星会"闪"。' },
      { id: 'joke-39', category: '冷笑话/谐音梗', content: '我问电风扇："我帅吗？" 然后电风扇摇了一晚上的头。' },
      { id: 'joke-40', category: '冷笑话/谐音梗', content: '许仙给白娘子买了一顶帽子，结果白娘子戴上之后就不能动了。原来那是一顶"压蛇帽"。' },
      { id: 'joke-41', category: '短梗/一句话笑话', content: '我终究没能飙得过那辆宝马，只能眼看着它在 sunset 中绝尘而去，不是我的引擎不好，而是我的车链子掉了。' },
      { id: 'joke-42', category: '短梗/一句话笑话', content: '如果你说我是错的，那你最好证明你是对的。' },
      { id: 'joke-43', category: '短梗/一句话笑话', content: '别看我穷，我花钱的速度可是很快的。' },
      { id: 'joke-44', category: '短梗/一句话笑话', content: '我每天都会给自己很多鼓励：加油！你是最胖的！' },
      { id: 'joke-45', category: '短梗/一句话笑话', content: '早知道现在是看脸的世界，当初就拿上学的钱去整容了。' },
      { id: 'joke-46', category: '短梗/一句话笑话', content: '别人一夸我，我就感到局促不安，itat least，因为是夸得还不够吧。' },
      { id: 'joke-47', category: '短梗/一句话笑话', content: '为什么要努力？因为我喜欢的东西都很贵，我想去的地方都很远，我爱的人超完美。' },
      { id: 'joke-48', category: '短梗/一句话笑话', content: '运动是一种享受，但我不爱运动，因为我不是那种贪图享受的人。' },
      { id: 'joke-49', category: '短梗/一句话笑话', content: '人生不如意事十有八九，剩下的一二是特别不如意。' },
      { id: 'joke-50', category: '短梗/一句话笑话', content: '我的钱包就像洋葱，每次打开都让我泪流满面。' },
      { id: 'joke-51', category: '经典老梗', content: '从前有个孩子叫小明，小明没听见。' },
      { id: 'joke-52', category: '经典老梗', content: '老师："同学们，今天我们来复习一下乘法口诀。三七？" 小明："四十一！" 老师："不对！" 小明："哦，是二十一！" 老师："这还差不多。" 小明："但是老师，我第一个答案更有深度。"' },
      { id: 'joke-53', category: '经典老梗', content: '唐僧："悟空，你能不能不要用筋斗云带我飞？为师想吐。" 悟空："师傅，这是祥云，不会吐的。" 唐僧："我要吐了，因为我恐高。" 悟空："那你念个咒，让云彩低点。" 唐僧："我念了，紧箍咒。"' },
      { id: 'joke-54', category: '经典老梗', content: '老婆在看韩剧，老公问："有什么好看的？" 老婆："欧巴！" 老公走过去一巴掌："啥巴我都打！"' },
      { id: 'joke-55', category: '经典老梗', content: '有一个猎人向一只狐狸开枪，为什么猎人死了？因为那是一只反射狐（谐音"反舌狐"，引申为"反射弧"太长，子弹反弹）。' },
      { id: 'joke-56', category: '经典老梗', content: '牙医："你喜欢甜食吗？" 病人："不，一点也不喜欢。" 牙医："那你这些蛀牙怎么解释？" 病人："是我女朋友喜欢甜食。"' },
      { id: 'joke-57', category: '经典老梗', content: '病人："医生，我手术成功的几率有多大？" 医生："百分之九十九。" 病人："真的吗？那太好了！" 医生："嗯，因为我已经做过99次了，都失败了，这次该成功了。"' },
      { id: 'joke-58', category: '经典老梗', content: '劫匪："通通不许动！钱是国家的，命是自己的！" 大家一动不动躺倒。劫匪望了一眼躺在桌上四肢朝天的出纳小姐，说："请你躺文明些！这是抢劫，不是强奸！"' },
      { id: 'joke-59', category: '经典老梗', content: '一男子在路边一根接着一根地抽烟。一个女士走过来对他说："抱歉，先生，您能不要在公共场合吸烟吗？" 男子说："我抽烟是为了让我看起来更酷。" 女士说："那你知道什么更酷吗？活到老。"' },
      { id: 'joke-60', category: '经典老梗', content: '一位老人去医院体检。医生说："大爷，您身体真好，就是腿有点毛病，要多锻炼。" 大爷说："哦，那我应该怎么锻炼呢？" 医生说："每天走十公里，坚持一年就好了。" 一年后，大爷打电话给医生："我的腿好了！" 医生问："您现在是去哪里都方便了吧？" 大爷说："不知道，我现在离家3650公里，回不去了。"' },
      { id: 'joke-61', category: '网络流行梗', content: '为什么超人要穿紧身衣？因为救人要紧。' },
      { id: 'joke-62', category: '网络流行梗', content: '诸葛亮对风说："风啊，你能刮大点吗？" 风说："可以，我可以给你刮个台风。" 诸葛亮："我要的不是这种（台风）！"' },
      { id: 'joke-63', category: '网络流行梗', content: '我对支付宝非常失望，该做的不做，弄这些乌烟瘴气的东西出来，我就问问你，查看附近的有钱人功能为什么还没上线？' },
      { id: 'joke-64', category: '网络流行梗', content: '问：在武侠世界里，开一家什么店最不容易被抢劫？答：兰州拉面。因为门上会写着"禁止外带"，而且高手都会说："大师兄，师父被妖怪抓走啦！"（指店内伙计忙碌）' },
      { id: 'joke-65', category: '网络流行梗', content: '"我有一份令人惊叹的工作。""什么工作？""惊叹号排版员。"' },
      { id: 'joke-66', category: '网络流行梗', content: '海绵宝宝被蟹老板开除了。海绵宝宝含着眼泪说："蟹老板…" 蟹老板："不用谢（蟹）。"' },
      { id: 'joke-67', category: '网络流行梗', content: '为什么程序员分不清万圣节和圣诞节？因为 Oct 31 == Dec 25。（八进制31等于十进制25）' },
      { id: 'joke-68', category: '网络流行梗', content: '年轻人对禅师说："我放不下一些事，放不下一些人。" 禅师说："Nothing is put down." 年轻人说："可我偏偏放不下。" 禅师让他拿着一个茶杯，然后往里倒热水，直到水溢出来。年轻人被烫到马上松开了手。禅师说："你看，这个世界上Nothing is put down." 年轻人说："我能换别的放不下吗？比如手机？"' },
      { id: 'joke-69', category: '网络流行梗', content: '客服："先生您好，请问有什么需要帮助的吗？" 我："我的手机卡了。" 客服："请问是哪种卡呢？是卡顿的卡，还是SIM卡的卡？" 我："是看得我脑壳疼的卡。"' },
      { id: 'joke-70', category: '网络流行梗', content: '我对2024年的愿望是：脱贫、脱单、不脱发。' },
      { id: 'joke-71', category: '脑筋急转弯类', content: '什么东西你能抓住，但不能摸？答案：别人的把柄。' },
      { id: 'joke-72', category: '脑筋急转弯类', content: '什么布剪不断？答案：瀑布。' },
      { id: 'joke-73', category: '脑筋急转弯类', content: '什么东西越洗越脏？答案：水。' },
      { id: 'joke-74', category: '脑筋急转弯类', content: '什么人没当爸爸就先当公公了？答案：太监。' },
      { id: 'joke-75', category: '脑筋急转弯类', content: '什么东西明明是你的，别人却用得比你多得多？答案：你的名字。' },
      { id: 'joke-76', category: '脑筋急转弯类', content: '黑人和白人生下的婴儿，牙齿是什么颜色？答案：婴儿没有牙齿。' },
      { id: 'joke-77', category: '脑筋急转弯类', content: '什么东西你能把它打破，但不需要用手碰它？答案：记录（打破记录）。' },
      { id: 'joke-78', category: '脑筋急转弯类', content: '什么东西你只能用左手拿，右手永远拿不到？答案：右手。' },
      { id: 'joke-79', category: '脑筋急转弯类', content: '什么东西你有，别人也有，although 是身外之物，却不能交换？答案：姓名。' },
      { id: 'joke-80', category: '脑筋急转弯类', content: '什么官不拿工资，还要自掏腰包请人吃饭？答案：新郎官。' },
      { id: 'joke-81', category: '跨界混搭类', content: '刘备的馬失控冲向悬崖，张飞急得大喊："大哥！你快勒马！" 刘备骂道："我快乐得很！"' },
      { id: 'joke-82', category: '跨界混搭类', content: '孟婆对阎王说："我天天给人喝汤，太无聊了，我要投胎。" 阎王说："好，那你把这碗汤喝了就去投胎吧。"' },
      { id: 'joke-83', category: '跨界混搭类', content: '孙悟空问土地公："土地土地，我叫你一声你敢答应吗？" 土地公说："不敢。" 孙悟空："为啥？" 土地公："你那是金箍棒，我这是瓷器活。"' },
      { id: 'joke-84', category: '跨界混搭类', content: '吕布和貂蝉在公园约会，吕布深情地说："貂蝉，我…" 貂蝉说："不，你别说，我怕你说出来我们就没法做朋友了。" 吕布："我是想说，我方天画戟放哪了？"' },
      { id: 'joke-85', category: '跨界混搭类', content: '诸葛亮："风啊，你能向西刮吗？" 风："我倒是想啊，我目前在东风快递，使命必达，只能往东。"' },
      { id: 'joke-86', category: '其他各类', content: '有一个胖子，从二十楼摔下来，结果变成了什么？答案：死胖子。' },
      { id: 'joke-87', category: '其他各类', content: '为什么暑假比寒假长？答案：因为热胀冷缩。' },
      { id: 'joke-88', category: '其他各类', content: '为什么动画片《猫和老鼠》里的老鼠要比猫厉害？答案：因为这部动画片是老鼠写的（编剧视角）。' },
      { id: 'joke-89', category: '其他各类', content: '问：世界上什么鸡跑得快？答：肯德基（快鸡）。' },
      { id: 'joke-90', category: '其他各类', content: '一个人从十楼跳下来，却没有摔死，为什么？答案：因为他往屋里跳。' },
      { id: 'joke-91', category: '其他各类', content: '什么水果最有钱？答案：橙子（因为"橙"谐音"成"，成功人士）。' },
      { id: 'joke-92', category: '其他各类', content: '为什么有钱人家的狗比较安静？答案：因为"苟（狗）富贵，勿相吠"。' },
      { id: 'joke-93', category: '其他各类', content: '为什么吵架的时候总会说"你给我等着"？答案：因为马上打不过。' },
      { id: 'joke-94', category: '其他各类', content: '为什么有的手机自带计算器功能？答案：因为买它的人算数都不好。' },
      { id: 'joke-95', category: '其他各类', content: '为什么人死后会变冷？答案：因为心静自然凉。' },
      { id: 'joke-96', category: '其他各类', content: '为什么考试时不给老师打电话？答案：因为君子动口（作弊）不动手（打电话）。' },
      { id: 'joke-97', category: '其他各类', content: '什么车寸步难行？答案：风车。' },
      { id: 'joke-98', category: '其他各类', content: '什么酒不能喝？答案：碘酒。' },
      { id: 'joke-99', category: '其他各类', content: '什么竹子不长在土里？答案：爆竹。' },
      { id: 'joke-100', category: '其他各类', content: '制造日期和有效日期是同一天的产品是什么？答案：报纸。' }
    ];
    
    // 为每条笑话添加日期信息
    const jokesWithDate = jokesList.map(joke => ({
      ...joke,
      date: new Date().toISOString()
    }));
    
    setJokes(jokesWithDate);
  };
  
  // 分页逻辑
  const indexOfLastJoke = currentPage * jokesPerPage;
  const indexOfFirstJoke = indexOfLastJoke - jokesPerPage;
  const currentJokes = jokes.slice(indexOfFirstJoke, indexOfLastJoke);
  const totalPages = Math.ceil(jokes.length / jokesPerPage);
  
  // 页面加载时生成笑话
  useEffect(() => {
    generateJokes();
  }, []);
  
  // 切换页面
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // 移动端菜单状态
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 关闭菜单的函数
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // 防止点击侧边栏内容时关闭菜单
  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="main-layout">
      {/* 移动端汉堡菜单按钮 - 仅在侧边栏隐藏时显示 */}
      {!mobileMenuOpen && (
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="打开菜单"
        >
          ☰
        </button>
      )}
      
      {/* 侧边栏背景遮罩 */}
      {mobileMenuOpen && (
        <div 
          className="sidebar-overlay active"
          onClick={closeMobileMenu}
          aria-label="关闭菜单"
        />
      )}
      
      {/* 侧边栏 */}
      <div 
        className={`sidebar ${mobileMenuOpen ? 'show' : ''}`}
        onClick={handleSidebarClick}
      >
        <button 
            className="mobile-close-btn"
            onClick={closeMobileMenu}
            aria-label="关闭菜单"
          >
            ×
          </button>
        <div className="logo">发电站</div>
        <nav className="sidebar-nav">
           <button 
            className={`sidebar-btn ${activePage === 'travel' ? 'active' : ''}`}
            onClick={() => {
              setActivePage('travel');
              closeMobileMenu();
            }}
            aria-label="旅游计划页面"
          >
            ✈️ 旅游计划
          </button>
          <button 
            className={`sidebar-btn ${activePage === 'jokes' ? 'active' : ''}`}
            onClick={() => {
              setActivePage('jokes');
              closeMobileMenu();
            }}
            aria-label="笑话管理页面"
          >
            😄 笑话管理
          </button>
          <button 
            className={`sidebar-btn ${activePage === 'tasks' ? 'active' : ''}`}
            onClick={() => {
              setActivePage('tasks');
              closeMobileMenu();
            }}
            aria-label="任务列表页面"
          >
            📝 任务列表
          </button>
          <button 
            className={`sidebar-btn ${activePage === 'analytics' ? 'active' : ''}`}
            onClick={() => {
              setActivePage('analytics');
              closeMobileMenu();
            }}
            aria-label="数据分析页面"
          >
            📊 数据分析
          </button>
          <button 
            className={`sidebar-btn ${activePage === 'games' ? 'active' : ''}`}
            onClick={() => {
              setActivePage('games');
              closeMobileMenu();
            }}
            aria-label="游戏中心页面"
          >
            🎮 游戏中心
          </button>
         
        </nav>
      </div>
      
      {/* 顶部导航栏 - 优化样式 */}
      <div className="nav-buttons-with-user">
        <div className="nav-buttons">
           <button 
            className={`nav-btn ${activePage === 'travel' ? 'active' : ''}`}
            onClick={() => setActivePage('travel')}
          >
            ✈️ 旅游
          </button>
          <button 
            className={`nav-btn ${activePage === 'jokes' ? 'active' : ''}`}
            onClick={() => setActivePage('jokes')}
          >
            😄 笑话
          </button>
          <button 
            className={`nav-btn ${activePage === 'tasks' ? 'active' : ''}`}
            onClick={() => setActivePage('tasks')}
          >
            📝 任务
          </button>
          <button 
            className={`nav-btn ${activePage === 'analytics' ? 'active' : ''}`}
            onClick={() => setActivePage('analytics')}
          >
            📊 分析
          </button>
          <button className={`nav-btn ${activePage === 'games' ? 'active' : ''}`}onClick={() => setActivePage('games')}>
            🎮 游戏
          </button>
        </div>
        
        <div className="user-info">
          {isLoggedIn ? (
            <div className="user-info-details">
              <span className="user-email">
                {isGuest ? '👤 游客' : `👤 ${email}`}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                注销
              </button>
            </div>
          ) : (
            <button 
              className="login-btn"
              onClick={() => setShowLoginModal(true)}
            >
              登录
            </button>
          )}
        </div>
      </div>
      
      {/* 主内容区域 */}
      <main className="content">
        {/* 旅游计划页面 */}
        {activePage === 'travel' && <TravelPlan />}
        
        {/* 任务列表页面 */}
        {activePage === 'tasks' && (
          <div className="todo-container">
            <h2>📝 任务列表</h2>
            <div className="input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="添加新任务..."
              />
              <button onClick={handleAddTask}>添加</button>
            </div>
            
            <ul className="task-list">
              {tasks.length === 0 ? (
                <li className="empty-state">暂无任务，添加一个吧！</li>
              ) : (
                tasks.map(task => (
                  <li key={task.id}>
                    <span className="task-text">{task.text}</span>
                    <div className="task-buttons">
                      <button onClick={() => handleCompleteTask(task.id)}>完成</button>
                      <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>删除</button>
                    </div>
                  </li>
                ))
              )}
            </ul>
            
            {completedTasks.length > 0 && (
              <div className="history-section">
                <button 
                  className="history-toggle"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  {showHistory ? '隐藏' : '查看'}已完成任务 ({completedTasks.length})
                </button>
                
                {showHistory && (
                  <ul className="history-list">
                    {completedTasks.map(task => (
                      <li key={task.id} className="history-item">
                        <div className="history-info">
                          <span className="history-text">{task.text}</span>
                          <span className="history-time">
                            完成于 {new Date(task.completedAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="history-actions">
                          <button 
                            className="restore-btn"
                            onClick={() => handleRestoreTask(task.id)}
                          >
                            恢复
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* 数据分析页面 */}
        {activePage === 'analytics' && (
          <div className="analytics-container">
            <h2>📊 数据分析</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3>总任务数</h3>
                <p className="stat-number">{tasks.length + completedTasks.length}</p>
              </div>
              <div className="stat-card">
                <h3>已完成任务</h3>
                <p className="stat-number">{completedTasks.length}</p>
              </div>
            </div>
            
            <div className="progress-section">
              <h3>完成进度</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{
                    width: `${tasks.length + completedTasks.length > 0 
                      ? (completedTasks.length / (tasks.length + completedTasks.length)) * 100 
                      : 0}%`
                  }}
                ></div>
              </div>
              <p className="progress-text">
                {tasks.length + completedTasks.length > 0 
                  ? `${Math.round((completedTasks.length / (tasks.length + completedTasks.length)) * 100)}%`
                  : '0%'}
              </p>
            </div>
            
            <div className="chart-placeholder">
              <h3>任务趋势</h3>
              <div className="bar-chart">
                {/* 这里应该是图表，但我们使用占位符 */}
                {[1, 2, 3, 4, 5, 6, 7].map(day => (
                  <div key={day} className="chart-bar">
                    <div 
                      className="bar"
                      style={{ height: `${Math.random() * 100 + 50}px` }}
                    ></div>
                    <span>第{day}天</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* 游戏管理页面 */}
        {activePage === 'games' && (
          <div className="games-container">
            <h2>🎮 游戏中心</h2>
            <div className="game-selection">
              <button className="game-btn">猜数字</button>
              <button className="game-btn">2048</button>
              <button className="game-btn">贪吃蛇</button>
              <button className="game-btn">俄罗斯方块</button>
            </div>
            <div className="game-wrapper">
              <p>请选择一个游戏开始玩吧！</p>
            </div>
          </div>
        )}
        
        {/* 笑话管理页面 */}
        {activePage === 'jokes' && (
          <div className="jokes-container">
            <h2>😄 笑话管理</h2>
            <p className="jokes-intro">这里为您整理了一百条风格多样的经典笑话，希望能博您一笑！</p>
            <p className="jokes-count">共 {jokes.length} 条笑话</p>
            
            <div className="jokes-list">
              {currentJokes.map(joke => (
                <div key={joke.id} className="joke-item">
                  <p className="joke-content">{joke.content}</p>
                  <div className="joke-meta">
                    <span className="joke-id">#{joke.id}</span>
                    <span className="joke-date">
                      {new Date(joke.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 分页控件 */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="page-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  上一页
                </button>
                
                <div className="page-numbers">
                  {currentPage > 3 && (
                    <>
                      <button 
                        className="page-btn"
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </button>
                      {currentPage > 4 && <span className="page-ellipsis">...</span>}
                    </>
                  )}
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    if (pageNum >= currentPage - 2 && pageNum <= currentPage + 2) {
                      return (
                        <button 
                          key={pageNum}
                          className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}
                  
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && <span className="page-ellipsis">...</span>}
                      <button 
                        className="page-btn"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                
                <button 
                  className="page-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  下一页
                </button>
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* 登录弹窗 - 优化样式 */}
      {showLoginModal && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <div className="login-modal-header">
              <h2>👤 用户登录</h2>
              <button 
                className="close-modal-btn"
                onClick={() => setShowLoginModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">邮箱</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入邮箱"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">密码</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  required
                />
              </div>
              
              <button type="submit" className="login-submit-btn">
                登录
              </button>
            </form>
            
            <div className="login-divider">
              <span>或</span>
            </div>
            
            <button 
              className="guest-login-btn"
              onClick={handleGuestLogin}
            >
              👥 游客登录
            </button>
            
            <div className="login-demo-info">
              <p className="demo-text">演示账号：</p>
              <p>email: demo@example.com</p>
              <p>password: 123456</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;