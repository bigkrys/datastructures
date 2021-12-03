/**
 * 字符串匹配
 * 如果在一个字符串A中查找字符串B，那么A就是主串，B是模式串。
 */

/**
 * BF算法：在主串中，检查起始位置分别是0、1、2...n-m,且长度为m的 n-m+1个子串是否有与模式串匹配的字符串。
 * (因为到了n-m的时候还没有查找到，那就是没有这个模式串了)
 * 思想：从string的一个字符开始i=0，判断是否与target的第一个一致j=0，如果是，ij都+1.对后续的字符进行判断
 * 如果不是则退出此次循环，从i=1,j=0开始判断，以此类推
 * 如果查找到了就返回成功（i当前值）否则返回-1
 */
 function searchBF(string,target){
    if(target == '') return 0
    let i = 0,n = string.length,m = target.length;
    for(i = 0;i<n-m+1;i++){
       for(let j = 0;j<m;j++){
           if(string[i+j] == target[j]){
               if(j == m-1){
                   return i;
               }else{
                   continue;
               }
           }else{
               break;
           }
       }
    }
    return -1;
}
/**
 * 
 1455. 检查单词是否为句中其他单词的前缀
 https://leetcode-cn.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence/
 */
 var isPrefixOfWord = function(sentence, searchWord) {
    sentence = sentence.split(' ');
    for(let i=0;i<sentence.length;i++){
        let word = sentence[i];
        let flag = isAWord(word,searchWord);
        if(flag!= -1){
            return i+1;
        }
    }
    return -1;
};
function isAWord(string,target){
    if(target == '') return 0
    let i = 0,n = string.length,m = target.length;
    for(i = 0;i<n-m+1;i++){
       for(let j = 0;j<m;j++){
           if(string[i+j] == target[j]){
               if(j == m-1 && i==0){
                   return i;
               }else{
                   continue;
               }
           }else{
               break;
           }
       }
    }
    return -1;
}
/**
 * 
 *  28. 实现 strStr()
 *  https://leetcode-cn.com/problems/implement-strstr/
 */

 var strStr = function(string, target) {
    if(target.length == 0) return 0;
    let i = 0;
    for(i = 0;i<string.length;i++){
        for(let j = 0;j<target.length;j++){
            if(string[i+j] == target[j]){
                if(j==target.length-1){
                    return i;
                }else{
                    continue;
                }
            }else{
                break;
            }
        } 
    }
    return -1;
};

/**
 * RK算法
 * 通过哈希算法对主串中的n-m+1个子串分别求哈希值，然后逐个与模式串的哈希值比较大小。
 * 如果某个子串的哈希值与模式串相等，那就说明对应的子串和模式串匹配了。
 * 
 * 
 * 那么，如何提高哈希算法计算子串哈希值的效率呢？
 * 
 * 假设我们搜索的模式串和主串都是一些英文字母。
 * 首先我们把a-z这26个小写字母用一个二十六进制来表示 ：a=0,z=25，以此类推。
 * 比如 dbc 这个字符串就等于 hash(dbc) 3*26 *26 + 1*26 + 2
 * 
 * 然后我们为了方便计算，先把0-m-1个26的幂次方计算下来
 * 
 * 26^0 26^1 26^2 ...26^m-1
 * 
 * 
 */

 function searchRK(string,target){
    let n = string.length,m = target.length,index = 0,hashObj = {};
    let miArray = [];
    let alphabet = {
        'a':0,
        'b':1,
        'c':2,
        'd':3,
        'e':4,
        'f':5,
        'g':6,
        'h':7,
        'i':8,
        'j':9,
        'k':10,
        'l':11,
        'm':12,
        'n':13,
        'o':14,
        'p':15,
        'q':16,
        'r':17,
        's':18,
        't':19,
        'u':20,
        'v':21,
        'w':22,
        'x':23,
        'y':24,
        'z':25

    }
    for(let i = 0;i<m;i++){//为了方便计算，先计算各个幂次方存储起来
        miArray.push(Math.pow(26,i))
    }
    //计算子串哈希值
    for(let i = 0;i<n-m;i++){
        let index = i;
        while(index<n){
            let str = string.substr(index,m);
            let  hashString = hash(str,miArray,alphabet);
            hashObj[hashString] = str;
            index = index+m;
        }
    }
    //对比
    let targetHash = hash(target,miArray,alphabet);
    if(hashObj[targetHash]){
        if(target == hashObj[targetHash]){
            return true
        }
    }
    return false;
}
function hash(string,miArray,alphabet){
    //计算哈希值
    let m = string.length,value = 0;
    for(let i = 0;i<m;i++){
        value += miArray[m-i-1]*(alphabet[string[i]]-alphabet['a'])
    }
    return value;
}

/**
 * BM算法
 * 也是一个一个的进行对比，只是当模式串与主串进行匹配的过程中，当模式串与主串的某个字符不匹配的时候，
 * 跳过这个不匹配的情况，将模式串往后多滑动几位。
 * BM算法包括 坏字符规则和好后缀规则。
 * 
 * 1、坏字符规则：
 * BM算法的匹配规则是按照模式串的下标，从大到小倒着匹配，也就是从右到左进行匹配。
 * 从模式串的末尾往前倒着匹配，当发现某个字符（主串中的字符）不匹配的时候，就把这个不匹配的字符叫做“坏字符”。
 * 然后拿“坏字符”在模式串中进行查找，发现模式串中不存在这个“坏字符”，于是直接把模式串往后滑动模式串的长度位。
 * 然后再从模式串的末尾字符开始比较。
 * 
 * 当发生不匹配的时候，就把“坏字符”对应模式串中的字符下标几位si，
 * 如果坏字符在模式串中存在，就把坏字符在模式串中的下标记为xi。
 * 如果不存在就把xi=-1.
 * 那么模式串往后移动的位数就等于si-xi.
 * 
 * 如果当坏字符在模式串中多处出现，那么xi的下标，选择最靠后那一个，这样就不会让模式串滑动太多，导致前面的没有匹配上。
 * 
 * 2、好后缀规则
 * 当从后往前进行匹配的时候，发现后面的都已经匹配了，但是前面有字符不匹配。
 * 就把这些已经匹配过的字符叫做好后缀（主串中的字符），记为u。
 * 然后拿u在模式串中进行查找，如果找到了另一个和u相同的子串v，就把模式串滑动到子串v与主串中u对齐的位置。
 * 如果在模式串中找不到另一个等于u的子串，
 * a、在模式串中找不到另一个等于u的子串，但是不代表找不到u的子串的子串。这话听起来很绕口吧，其实是这样
 * 假设好后缀的字符是"bc"，因为刚才我们已经遍历过模式串中好后缀前面的字符了，发现不再存在“bc”这样的字符串，
 * 但是模式串的前缀有可能存在‘c’，也就是说，模式串的前缀"c"有可能与好后缀的子串'c'匹配，
 * 这种情况，就在好后缀的后缀子串中，找出一个最长的并且能跟模式串的前缀子串匹配的，假设是v，就把模式串移动到v中。
 * 
 * 
 * 先分别计算好坏字符和好后缀的滑动次数，然后取两个数中最大的，作为模式串往后滑动的位数。
 */

/**
 * 坏字符规则的实现
 * 思路：使用散列表来存储模式串中各个字符在模式串中的下标。
 * 首先使用一个256大小的数组记录每个字符的位置，下标对应字符的accll码，而存储的值就是字符在模式串中的位置
 */
function generateHashBC(target){
    //根据模式串的字符 生成一个散列表
    let hashArray = new Array(256).fill(-1);
    for(let i = 0;i<target.length;i++){
        let ascii = target[i].charCodeAt();
        hashArray[ascii] = i;
    }
    return hashArray;
}
function badBM(string,target){
    let hashBC = generateHashBC(target);//生成模式串的各个哈希表
    let i = 0,n = string.length;m = target.length;
    while(i<=n-m){
        let j;
        for(j = m-1;j>=0;j--){
            //从后往前开始匹配
            if(string[i+j] != target[j]){
                //遇到不匹配的 退出此处循环
                break;
            }
        }
        if(j<0){
            return i;//匹配成功了。
        }
        let index = string[i+j].charCodeAt()
        i = i + (j - hashBC[index]);
    }
    return -1;
}
/**
 * 好后缀的实现：
 * 核心是
 * a、在模式串中，查找到跟好后缀A匹配的另一个子串B
 * b、在好后缀的后缀子串中，查找到最长的、能跟模式串前缀子串匹配的后缀子串。
 * 所以，预先把模式串中的后缀子串先计算好，对应着一个匹配子串的位置。
 * 比如我的模式串是这样的：cabcab，那么有可能的好后缀子串如下
 * 那么它一共的好后缀子串A有
 * b      ----  1
 * ab     ----- 2
 * cab    ----- 3
 * bcba   ----- 4
 * abcab  ----- 5
 * 
 * 那么 在模式串中跟好后缀u相匹配的子串B的起始下标就是 （就是  模式串中 在好后缀前面 是否还能查找到这个字符串，这个字符串的下标）
 * b    ----- 2
 * ab   ----- 1
 * cab  ----- 0
 * bcab ----- -1
 * abcab ---- -1
 * 
 * 
 * 因为后缀子串的长度是逐个递增的，所以我们可以使用一个suffix数组，查找到跟好后缀匹配的另一个子串，下标对应着后缀子串的长度，
 * 然后对应的数值值存储的是在模式串中跟好后缀匹配的子串的起始下标志。
 * 
 * 那么 这个suffix数组就像下面这样
 * suffix[1] = 2
 * suffix[2] = 1
 * suffix[3] = 0
 * suffix[4] = -1
 * suffix[5] = -1
 * 
 * 记住suffix数组是用来匹配好后缀子串 在模式串前面查找到的下标
 * 
 * 当模式串中有多个子串跟后缀子串匹配，存储的是最靠后面的子串的起始位置，也就是下标最大的子串的起始位置
 * 
 * 接下来，还需要有一个数组，用来在好后缀的后缀子串中，查找到最长的能跟模式前缀子串匹配的后缀子串。
 * 怎么来实现这个数组呢，我们用一个布尔型的数字prefix，用来记录模式串的后缀子串时候能匹配模式串的前缀子串
 * 
 * 比如上面的后缀子串,
 * b    ----- false
 * ab   ----- false
 * cab  ----- true
 * bcab ----- false
 * abcab ---- false
 * 
 * 那么perfix数组的值就是下面这样
 * prefix[1] = false
 * prefix[2] = false
 * prefix[3] = true
 * prefix[4] = false
 * prefix[5] = false
 * 
 * 所以记得 prefix数组中存储的是 好后缀对应的子串 是否有匹配的前缀子串。
 * 
 * 下面先来看怎么来实现这两个数组
 */



function generateSP(target){
    let suffix = new Array(target.length).fill(-1);//下标从0-m，其中0不存储数据，所以长度还是target.length
    let prefix = new Array(target.length).fill(false);
    //字符串从前面和后面进行对比,target[j]是前面的，target[length-1-k]是后面的
    //当有一个字符匹配了，k++，j--
    //前缀子串往前移动，后缀子串往前移动，进行下一个字符的对比
    for(let i = 0;i<target.length-1;i++){
        let j = i,k = 0;
        while(j>=0&&target[j] == target[target.length-1-k]){
            j--;
            k++;
            suffix[k] = j+1;
        }
        if(j==-1){
            prefix[k] = true
        }

    }
    return {
        suffix,
        prefix
    }
}
/**
 * 那么根据这两个好后缀的规则，怎么计算模式串往后移动的位数呢？
 * 分两步
 * 1、先拿到好后缀，长度为k在suffix数组中查找对应的k位的值
 * 2、如果对应的值不为-1.，那么就移动j-suffix[k]+1位
 * 3、如果对应值为-1，就代表模式串中不存在另一个跟好后缀匹配的子串，
 * 假设好后缀的字符串下标为j-m-1,那么从j-m-1中检查是否有一个字符串r-m-1，是的k = m-r
 * 如果prefix[k] == true,就是这个好后缀中有可以匹配的前缀子串，就可以将模式串后移
 * 
 * 
 * 
 * 4、如果上面两个都没有找到可以匹配的好后缀和他的子串，就将模式后移模式串长度的位。
 */

function moveByGS(j,m,suffix,prefix){
    let k = m-1-j;//好后缀的长度
    if(suffix[k] != -1) return j - (suffix[k]) + 1;
    for(let r = j+2;r<=m-1;r++){
        //j是坏字符，j+1是好后缀，j+2是好后缀的后缀子串的起始 所以从好后缀的后缀子串中判断是否有前缀子串匹配
        if(prefix[m-r]){
            return r;
        }     
    }
    return m;
}

function BM(string,target){
    let hashBC = generateHashBC(target);//生成模式串的各个哈希表
    let i = 0,n = string.length;m = target.length;
    let res = generateSP(target);
    let suffix = res.suffix,prefix = res.prefix;
    //先匹配坏字符
    while(i<=n-m){
        let j;
        for(j = m-1;j>=0;j--){
            //从后往前开始匹配
            if(string[i+j] != target[j]){
                //遇到不匹配的 退出此处循环
                break;
            }
        }
        if(j<0){
            return i;//匹配成功了。
        }
        let index = string[i+j].charCodeAt();
        let x = (j - hashBC[index]);//坏字符规则计算的长度
        let y = 0;
        if(j<m-1){
            y = moveByGS(j,m,suffix,prefix);
        }
        i = i + Math.max(x,y);
    }
    return -1;
}




/**
 * 1408. 数组中的字符串匹配
https://leetcode-cn.com/problems/string-matching-in-an-array/submissions/
 */


var stringMatching = function(words) {
    let result = new Set();
    for(let i = 0;i<words.length;i++){
        let j = i+1,n = words[i].length;
        for(;j<words.length;j++){
            let m = words[j].length;
            if(Math.max(m,n) == n){

                if(BM(words[i],words[j]) > -1){
                    result.add(words[j]);
                }
            }else{
                if(BM(words[j],words[i]) > -1){
                    result.add(words[i]);
                }
            }
            
        }
    }
    return Array.from(result);

};
function generateHashBC(target){
    //根据模式串的字符 生成一个哈希值的散列表，这样就可以在有坏字符的时候 迅速判断前面是否有匹配的坏字符
    //散列表下标对应 字符的ascll骂
    let hashArray = new Array(256).fill(-1);
    for(let i=0;i<target.length;i++){
        let code = target[i].charCodeAt();
        hashArray[code] = i;
    }
    return hashArray;
}
function generateSP(target){
    //根据模式串生成一个 装着对应好后缀长度中 模式串前面匹配的子串下标suffix，还有一个对应的后缀子串是否有前缀子串匹配
    let suffix = new Array(target.length).fill(-1);
    let prefix = new Array(target.length).fill(false);

    for(let i = 0;i<target.length-1;i++){
        //这里要记住！！！！ i必须要是模式串的子串 不能完全等于 所以i<target.length-1
        let j=i;k=0;
        while(j>=0 && target[j] == target[target.length - 1- k]){
            j--;
            k++;
            suffix[k] = j+1;//这里也要小心，suffix[k]对应的是j的下标，因为走动的是j而不是i
        }
        if(j == -1){
            prefix[k] = true
        }
    }
    return {
        suffix,
        prefix,
    }
}
function goodSuffix(j,m,suffix,prefix){
    //根据好后缀两个规则来判断应该移动几位
    let k = m-1-j;//好后缀的长度
    if(suffix[k]>-1) return j-(suffix[k])+1;
    for(r = j+2;r<m;r++){
        if(prefix[m-r]) return r;
    }
    return m;//如果都不匹配 直接移动整个模式串的长度
}
function BM(string,target){
    let hashArray = generateHashBC(target);//先生成一个哈希散列表
    let {suffix,prefix} = generateSP(target);//生成suffix，prefix数组
    let n = string.length,m = target.length,i=0;
    //首先按照坏字符规则从后往前匹配字符
    while(i <= n-m){
        let j;
        for(j = m-1;j>=0;j--){
            if(target[j] != string[i+j]){
                break;
            }
        }
        if(j<0){
            return i;//找到了
        }

        let badIndex = j - hashArray[string[i+j].charCodeAt()];//这里也要非常小心 获取到的是string[i+j]的
        let goodIndex = 0;
        if(j<m-1){
            goodIndex =  goodSuffix(j,m,suffix,prefix)
        }
        i = i + Math.max(badIndex,goodIndex);

    }
    return -1;
}













/**
 * KMP算法
 * KMP算法是从前往后进行匹配的，在模式串从前往后与主串匹配的过程中，把不能匹配的字符叫做坏字符，已经匹配的那段字符叫做好前缀。
 * 比如主串ababaeabac，模式串ababacd
 * 那么 ababa就是好前缀 e就是坏字符,
 * 当模式串遇到有坏字符的时候，是不是就要把模式串往后滑动了，那么怎么去计算这个滑动的次数呢？
 * 
 * 从好前缀的后缀子串u中，查找到最长的可匹配的前缀子串v，假设v的长度是k，那么模式串一次性往后滑动j-k位。
 * 那么此时j = j-k。
 * 
 * 比如好前缀ababa，它的后缀子串有(后面括号紧跟的是下标)
 * a（4）
 * ba(3)
 * aba(2)
 * baba(1)
 * 
 * 那么它对应的可以匹配的前缀子串是
 * 
 * a (4)  ----- a(0)
 * ba(3) -------- 没有匹配的前缀子串
 * aba(2) ------ aba(0)
 * baba(1) ------没有匹配的前缀子串
 * 
 * 
 * 那么 最长可以匹配的后缀子串就是aba(2)
 * 最长可以匹配的前缀子串就是 aba(0)
 * 
 * 
 * 接下来我们来思考一下 怎么去求这个最长可匹配的后缀子串和最长可以匹配的前缀子串
 * 首先，好前缀也是模式串的一部分 比如模式串ababacd中好前缀可能的有,括号对应的是好前缀最后一个字符的下标
 * a     ---- （0）
 * ab    ---- （1）
 * aba   ---- （2）
 * abab  ---- （3）
 * ababa ---- （4）
 * ababac---- （5）
 * 
 * 那么它有可能的最长可以匹配的前缀子串 有
 * 
 * a      ---- （0）  ----- -1(不存在，因为a没有子串)
 * ab     ---- （1）  ------ -1(不存在，因为子串b不匹配前缀)
 * aba    ---- （2）  ------- 0 （它的后缀子串分别有 a 、ba,其中后缀子串a对应前缀子串a(子串最后一个字符下标为0)）
 * abab   ---- （3）  ------- 1  (它的后缀子串分别有 b 、ab、bab、,其中后缀子串ab对应前缀子串ab(子串最后一个字符下标为1))
 * ababa  ---- （4） ------- 2 (它的后缀子串分别有a、 ba 、aba、baba、,其中后缀子串aba对应前缀子串aba(子串最后一个字符下标为2))
 * ababac ---- （5）------- -1 (它的后缀子串分别有c、ac、 bac 、abac、babac、不存在)
 * 
 * 
 * 这样能看懂吗？
 * 我们构造一个这样的方法
 * next[0] = -1
 * next[1] = -1
 * next[2] =  0
 * next[3] =  1
 * next[4] =  2
 * next[5] = -1
 * 
 * 
 * 这个步骤怎么实现呢？思考一下
*/









































