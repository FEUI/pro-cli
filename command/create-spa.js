const fs = require('fs')
const inquirer = require('inquirer')
const init = require('../lib/init')

const QUESTIONS = [
	{
		type: 'input',
		name: 'name',
		message: '请输入SPA工程名（建议以st-作为前缀）: ',
		default: 'st-hello-world',
		validate: (val) => {
			try {
				if (fs.statSync(val)) {
					return '文件或目录已存在，请重新命名';
				}
			} catch (e) {
				return true;
			}
		}
	},
	{
		type: 'input',
		name: 'description',
		message: '请输入工程描述: ',
		validate: (val) => {
			if (val) return true;
			return '请描述一下工程的作用';
		}
	},
	{
		type: 'input',
		name: 'autoInstallNpm',
		message: '是否自动安装npm(true或false): ',
		default: true,
		validate: (val) => {
			return Boolean(val);
		}
	},
	{
		type: 'input',
		name: 'port',
		message: '本地开发的端口号：',
		default: Math.floor(Math.random() * 7000 + 3000),
		validate: (val) => {
			if (val) return true;
			return '必须是数字';
		}
	}
]

const TEMPLATE = 'vuejs-templates/webpack'

module.exports = () => {
	return inquirer.prompt(QUESTIONS).then(answers => {
		init(TEMPLATE, answers)    
	})
}