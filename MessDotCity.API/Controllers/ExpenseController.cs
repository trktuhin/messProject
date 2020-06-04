using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Dtos;
using MessDotCity.API.Helpers;
using MessDotCity.API.Hubs;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace MessDotCity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMessRepository _repo;
        private readonly IUnitOfWork _uow;
        private readonly IProfileRepository _proRepo;
        private readonly IHubContext<TokenHub> _tokenHubContext;
        private readonly ICommonMethods _cms;
        public ExpenseController(IMapper mapper, IMessRepository repo, IUnitOfWork uow,
                                IProfileRepository proRepo,
                                IHubContext<TokenHub> tokenHubContext,
                                ICommonMethods cms)
        {
            _tokenHubContext = tokenHubContext;
            _proRepo = proRepo;
            _uow = uow;
            _repo = repo;
            _mapper = mapper;
            _cms = cms;

        }

        [HttpPost("AddDailyExpense")]
        public async Task<IActionResult> AddDailyExpense(DailyExpenseCreationDto dto)
        {
            // checking is admin
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();
            var existingExpense = await _repo.GetDailyExpenseByDate(dto.Day);
            if(existingExpense != null) return BadRequest("Expense already exists for the day!");
            // mapping expense and meal object
            var dexpense = new DailyExpense();
            dexpense.Day = dto.Day.Date;
            dexpense.Expense = dto.Expense;
            dexpense.MessId = messId;
            dexpense.ResponsibleMember = dto.ResponsibleMember;
            float totalMeals = 0;

            var meals = new List<Meal>();
            foreach(var member in dto.Members)
            {
                // calculating total meals
                totalMeals += member.DBreakfast;
                totalMeals += member.DLunch;
                totalMeals += member.DDinner;

                var meal = new Meal();
                meal.BreakFast = member.DBreakfast;
                meal.Lunch = member.DLunch;
                meal.Dinner = member.DDinner;
                meal.MemberId = member.Id;
                meal.MessId = messId;
                meal.Day = dexpense.Day;
                meals.Add(meal);
            }
            // totalmeal needs to be float in sql server
            dexpense.TotalMeal = (int)totalMeals;
            _repo.Add(dexpense);
            _repo.AddMultiple(meals);
            await _uow.Complete();
            return Ok();
        }
    
        [HttpGet("GetDailyExpenses")]
        public async Task<IActionResult> GetDailyExpenses()
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var dexpenses = await _repo.GetDailyExpenses(messId);
            return Ok(dexpenses);
        }

        [HttpGet("GetDailyExpenseDetails/{id}")]
        public async Task<IActionResult> GetDetailedDailyExpense(int id)
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var dailyExpense = await _repo.GetDailyExpenseById(id);
            if(dailyExpense == null) return NotFound();
            var memberMeals = await _repo.GetMemberMealResources(messId, dailyExpense.Day);
            return Ok(new {
                expense = dailyExpense,
                memberMeals = memberMeals
            });
        }

        [HttpPostAttribute("EditDailyExpense")]
        public async Task<IActionResult> EditDailyExpense(DailyExpenseUpdateDto dto)
        {
            // checking is admin
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();
            // getting existing data
            var dailyExpenseInDb = await _repo.GetDailyExpenseById(dto.DailyExpense.Id);
            dailyExpenseInDb.ResponsibleMember = dto.DailyExpense.ResponsibleMember;
            dailyExpenseInDb.Expense = dto.DailyExpense.Expense;
            float totalMeals = 0;
            // getting new objects ready
            var meals = new List<Meal>();
            foreach(var member in dto.MemberMealResources)
            {
                // calculating total meals
                totalMeals += member.Breakfast;
                totalMeals += member.Lunch;
                totalMeals += member.Dinner;

                var meal = new Meal();
                meal.BreakFast = member.Breakfast;
                meal.Lunch = member.Lunch;
                meal.Dinner = member.Dinner;
                meal.MemberId = member.MemberId;
                meal.MessId = messId;
                meal.Day = dto.DailyExpense.Day.Date;
                meals.Add(meal);
            }
            dailyExpenseInDb.TotalMeal = (int)totalMeals;
            // deleting old meals
            var mealsInDb = await _repo.GetMealsByDate(dto.DailyExpense.Day, messId);
            _repo.RemoveMultiple(mealsInDb);
            // adding new meals
            _repo.AddMultiple(meals);
            // saving changes of the new records
            await _uow.Complete();
            return Ok();
        }

        [HttpDelete("DeleteDailyExpense/{id}")]
        public async Task<IActionResult> DeleteDailyExpense(int id)
        {
            // checking is admin
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();

            var dailyExpenseInDb = await _repo.GetDailyExpenseById(id);
            if(dailyExpenseInDb == null) return NotFound();
            var mealsInDb = await _repo.GetMealsByDate(dailyExpenseInDb.Day, messId);
            _repo.RemoveMultiple(mealsInDb);
            _repo.Delete(dailyExpenseInDb);
            await _uow.Complete();
            return Ok();
        }
        [HttpGet("GetFixedExpenses")]
        public async Task<IActionResult> GetFixedExpenses()
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var fExpeses = await _repo.GetFixedExpenses(messId);
            return Ok(fExpeses);
        }

        [HttpGet("GetFixedExpense/{id}")]
        public async Task<IActionResult> GetFixedExpense(int id)
        {
            var fex = await _repo.GetFixedExpenseById(id);
            if(fex == null) return NotFound();
            return Ok(fex);
        }

        [HttpPost("AddFixedExpense")]
        public async Task<IActionResult> AddFixedExpense(FixedExpenseDto dto)
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();

            var expenseToCreate = _mapper.Map<FixedExpense>(dto);
            expenseToCreate.MessId = messId;
            expenseToCreate.LastModifiedOn = DateTime.Now;
            _repo.Add(expenseToCreate);
            await _uow.Complete();
            return Ok();
        }

        [HttpPut("UpdateFixedExpense")]
        public async Task<IActionResult> UpdateFixedExpense(FixedExpenseDto dto)
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();
            int id = 0;
            if(dto.Id != null) id = (int)dto.Id;
            var fexInDb = await _repo.GetFixedExpenseById(id);
            if(fexInDb == null) return NotFound();
            _mapper.Map<FixedExpenseDto,FixedExpense>(dto, fexInDb);
            fexInDb.LastModifiedOn = DateTime.Now;
            await _uow.Complete();
            return Ok();
        }

        [HttpDelete("DeleteFixedExpense/{id}")]
        public async Task<IActionResult> DeleteFixedExpense(int id)
        {
            // checking is admin
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();

            var fixedExpenseInDb = await _repo.GetFixedExpenseById(id);
            if(fixedExpenseInDb == null) return NotFound();
            _repo.Delete(fixedExpenseInDb);
            await _uow.Complete();
            return Ok();
        }

        [HttpGet("GetMealRatesWithPerHeads")]
        public async Task<IActionResult> GetMealRates()
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var messInDb = await _repo.GetmessByMessId(messId);
            if(messInDb == null) return NotFound();
            var mealRate = await _repo.GetMealReate(messId);
            var fixedPerHead = await _repo.FixedExpersePerMember(messId);
            return Ok(new {
                mealRate = mealRate,
                otherExpense = fixedPerHead
            });
        }
    }
}