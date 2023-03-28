using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public int? ParentId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}